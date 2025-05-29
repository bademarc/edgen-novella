import './style.css'
import AudioManager from './audio.js'
import GameManager from './game.js'
import SettingsManager from './settings.js'

// Visual Novel Game - Main Entry Point
class VisualNovelGame {
  constructor() {
    this.audioManager = null;
    this.gameManager = null;
    this.settingsManager = null;

    this.init();
  }

  // Initialize the game
  async init() {
    try {
      console.log('Initializing Visual Novel Game...');

      // Wait for DOM to be fully loaded
      if (document.readyState === 'loading') {
        await new Promise(resolve => {
          document.addEventListener('DOMContentLoaded', resolve);
        });
      }

      // Initialize mobile viewport height
      this.initMobileViewport();

      // Initialize managers
      this.audioManager = new AudioManager();
      this.gameManager = new GameManager(this.audioManager);
      this.settingsManager = new SettingsManager(this.audioManager);

      // Setup global error handling
      this.setupErrorHandling();

      // Setup performance monitoring
      this.setupPerformanceMonitoring();

      console.log('Visual Novel Game initialized successfully!');

    } catch (error) {
      console.error('Failed to initialize game:', error);
      this.showErrorMessage('Failed to initialize game. Please refresh the page.');
    }
  }

  // Initialize mobile viewport height
  initMobileViewport() {
    // Set initial viewport height
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // Force mobile viewport constraints
    document.body.style.width = '100vw';
    document.body.style.height = '100vh';
    document.body.style.maxWidth = '100vw';
    document.body.style.maxHeight = '100vh';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';

    // Prevent zoom and scrolling (but allow game interactions)
    document.addEventListener('touchmove', (e) => {
      // Only prevent if it's not a single touch on the game screen
      if (e.touches.length > 1 || !e.target.closest('#game-screen')) {
        e.preventDefault();
      }
    }, { passive: false });

    document.addEventListener('gesturestart', (e) => {
      e.preventDefault();
    });

    document.addEventListener('gesturechange', (e) => {
      e.preventDefault();
    });

    document.addEventListener('gestureend', (e) => {
      e.preventDefault();
    });

    // Update on resize (for mobile browsers with dynamic toolbars)
    window.addEventListener('resize', () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);

      // Re-enforce constraints
      document.body.style.width = '100vw';
      document.body.style.height = '100vh';
    });

    // Handle orientation change
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        document.body.style.width = '100vw';
        document.body.style.height = '100vh';
      }, 100);
    });

    console.log('Mobile viewport initialized with constraints');

    // Force image scaling on mobile
    this.forceImageScaling();
  }

  // Force proper image scaling on mobile devices
  forceImageScaling() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
      // Function to scale images
      const scaleImages = () => {
        const images = document.querySelectorAll('.menu-background img, .game-background img, .settings-background img');
        images.forEach(img => {
          img.style.width = '100vw';
          img.style.height = '100vh';
          img.style.objectFit = 'contain';
          img.style.objectPosition = 'center';
          img.style.maxWidth = '100vw';
          img.style.maxHeight = '100vh';
        });

        // Scale all other images too
        const allImages = document.querySelectorAll('img');
        allImages.forEach(img => {
          if (!img.closest('.menu-background, .game-background, .settings-background')) {
            img.style.maxWidth = '100vw';
            img.style.maxHeight = '100vh';
            img.style.objectFit = 'contain';
          }
        });
      };

      // Scale images immediately
      scaleImages();

      // Scale images when they load
      document.addEventListener('DOMContentLoaded', scaleImages);

      // Scale images when new content is added
      const observer = new MutationObserver(scaleImages);
      observer.observe(document.body, { childList: true, subtree: true });

      console.log('Mobile image scaling enforced');
    }
  }

  // Setup global error handling
  setupErrorHandling() {
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
      this.showErrorMessage('An unexpected error occurred.');
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      this.showErrorMessage('An unexpected error occurred.');
    });
  }

  // Setup performance monitoring
  setupPerformanceMonitoring() {
    // Monitor memory usage (if available)
    if (performance.memory) {
      setInterval(() => {
        const memory = performance.memory;
        if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
          console.warn('High memory usage detected');
        }
      }, 30000); // Check every 30 seconds
    }

    // Monitor frame rate
    let lastTime = performance.now();
    let frameCount = 0;

    const checkFrameRate = (currentTime) => {
      frameCount++;

      if (currentTime - lastTime >= 1000) {
        const fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;

        if (fps < 30) {
          console.warn(`Low frame rate detected: ${fps} FPS`);
        }
      }

      requestAnimationFrame(checkFrameRate);
    };

    requestAnimationFrame(checkFrameRate);
  }

  // Show error message to user
  showErrorMessage(message) {
    const errorEl = document.createElement('div');
    errorEl.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        font-family: Arial, sans-serif;
      ">
        <div style="
          text-align: center;
          padding: 2rem;
          background: #333;
          border-radius: 8px;
          max-width: 400px;
        ">
          <h2 style="color: #e74c3c; margin-bottom: 1rem;">Error</h2>
          <p style="margin-bottom: 1rem;">${message}</p>
          <button onclick="location.reload()" style="
            padding: 0.5rem 1rem;
            background: #3498db;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          ">Reload Page</button>
        </div>
      </div>
    `;

    document.body.appendChild(errorEl);
  }

  // Get game instance (for debugging)
  getGameState() {
    return {
      audio: this.audioManager?.getVolumes(),
      game: this.gameManager?.getState(),
      settings: this.settingsManager?.getCurrentSettings(),
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio,
        userAgent: navigator.userAgent,
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      }
    };
  }
}

// Initialize the game when the script loads
const game = new VisualNovelGame();

// Make game instance available globally for debugging
window.visualNovelGame = game;

// Export for potential module usage
export default VisualNovelGame;
