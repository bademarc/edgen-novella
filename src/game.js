// Game state management for the visual novel
class GameManager {
  constructor(audioManager) {
    this.audioManager = audioManager;
    this.currentScene = 0;
    this.maxScene = 34; // Based on the images available (1-34)
    this.gameState = 'menu'; // 'menu', 'playing', 'settings', 'loading'
    this.sceneViewed = false; // Track if current scene has been fully viewed
    this.viewTimer = null;
    this.minViewTime = 1000; // Minimum time to view a scene (1 second)
    
    // DOM elements
    this.screens = {
      menu: document.getElementById('main-menu'),
      game: document.getElementById('game-screen'),
      settings: document.getElementById('settings-screen'),
      loading: document.getElementById('loading-screen')
    };
    
    this.images = {
      menu: document.getElementById('menu-image'),
      scene: document.getElementById('scene-image'),
      settingsBg: document.getElementById('settings-bg')
    };
    
    this.elements = {
      sceneNumber: document.getElementById('scene-number'),
      clickIndicator: document.querySelector('.click-indicator')
    };
    
    // Initialize the game
    this.init();
  }

  // Initialize game
  init() {
    this.loadMenuImage();
    this.setupEventListeners();
    this.showScreen('menu');
  }

  // Load menu image (image 0)
  loadMenuImage() {
    this.images.menu.src = './images/0_menu.png';
    this.images.settingsBg.src = './images/0_menu.png'; // Use menu image as settings background
    
    this.images.menu.onerror = () => {
      console.warn('Menu image failed to load, trying alternative path');
      this.images.menu.src = './images/0.png'; // Fallback
    };
  }

  // Setup event listeners
  setupEventListeners() {
    // Menu buttons
    document.getElementById('play-btn').addEventListener('click', () => this.startGame());
    document.getElementById('settings-btn').addEventListener('click', () => this.showSettings());
    document.getElementById('back-btn').addEventListener('click', () => this.showMenu());
    
    // Game screen click to advance
    this.screens.game.addEventListener('click', (e) => this.handleGameClick(e));
    
    // Prevent context menu on game screen
    this.screens.game.addEventListener('contextmenu', (e) => e.preventDefault());
    
    // Keyboard controls
    document.addEventListener('keydown', (e) => this.handleKeyPress(e));
  }

  // Handle game screen clicks
  handleGameClick(e) {
    if (this.gameState !== 'playing') return;
    
    // Check if scene has been viewed for minimum time
    if (!this.sceneViewed) {
      this.showMessage('Please wait a moment before continuing...');
      return;
    }
    
    this.nextScene();
  }

  // Handle keyboard input
  handleKeyPress(e) {
    switch (e.key) {
      case 'Escape':
        if (this.gameState === 'playing') {
          this.showMenu();
        } else if (this.gameState === 'settings') {
          this.showMenu();
        }
        break;
      case ' ':
      case 'Enter':
        if (this.gameState === 'playing' && this.sceneViewed) {
          this.nextScene();
        }
        break;
    }
  }

  // Start the game
  async startGame() {
    this.showScreen('loading');
    
    // Start background music
    await this.audioManager.startBackgroundMusic();
    
    // Reset game state
    this.currentScene = 1;
    this.gameState = 'playing';
    
    // Load first scene
    await this.loadScene(this.currentScene);
    
    this.showScreen('game');
  }

  // Load a specific scene
  async loadScene(sceneNumber) {
    try {
      this.sceneViewed = false;
      
      // Update scene counter
      this.elements.sceneNumber.textContent = `Scene ${sceneNumber}`;
      
      // Load scene image
      const imagePath = `./images/${sceneNumber}.png`;
      await this.loadImage(this.images.scene, imagePath);
      
      // Play corresponding sound effect
      await this.audioManager.playSoundEffect(sceneNumber);
      
      // Start view timer
      this.startViewTimer();
      
      console.log(`Loaded scene ${sceneNumber}`);
      
    } catch (error) {
      console.error(`Failed to load scene ${sceneNumber}:`, error);
      this.showMessage('Failed to load scene. Please try again.');
    }
  }

  // Load image with promise
  loadImage(imgElement, src) {
    return new Promise((resolve, reject) => {
      imgElement.onload = () => resolve();
      imgElement.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      imgElement.src = src;
    });
  }

  // Start view timer for current scene
  startViewTimer() {
    if (this.viewTimer) {
      clearTimeout(this.viewTimer);
    }
    
    this.viewTimer = setTimeout(() => {
      this.sceneViewed = true;
      this.elements.clickIndicator.style.opacity = '1';
    }, this.minViewTime);
    
    // Hide click indicator initially
    this.elements.clickIndicator.style.opacity = '0.3';
  }

  // Advance to next scene
  async nextScene() {
    if (this.currentScene >= this.maxScene) {
      this.endGame();
      return;
    }
    
    this.currentScene++;
    await this.loadScene(this.currentScene);
  }

  // End the game
  endGame() {
    this.showMessage('Thank you for playing!');
    setTimeout(() => {
      this.showMenu();
    }, 3000);
  }

  // Show settings screen
  showSettings() {
    this.gameState = 'settings';
    this.showScreen('settings');
  }

  // Show menu screen
  showMenu() {
    this.gameState = 'menu';
    this.currentScene = 0;
    this.showScreen('menu');
  }

  // Show specific screen
  showScreen(screenName) {
    // Hide all screens
    Object.values(this.screens).forEach(screen => {
      screen.classList.remove('active');
    });
    
    // Show target screen
    if (this.screens[screenName]) {
      this.screens[screenName].classList.add('active');
    }
  }

  // Show temporary message
  showMessage(message) {
    // Create temporary message element
    const messageEl = document.createElement('div');
    messageEl.textContent = message;
    messageEl.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 1rem 2rem;
      border-radius: 8px;
      z-index: 1000;
      font-size: 1.2rem;
      text-align: center;
    `;
    
    document.body.appendChild(messageEl);
    
    // Remove after 2 seconds
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.parentNode.removeChild(messageEl);
      }
    }, 2000);
  }

  // Get current game state
  getState() {
    return {
      currentScene: this.currentScene,
      maxScene: this.maxScene,
      gameState: this.gameState,
      sceneViewed: this.sceneViewed
    };
  }
}

export default GameManager;
