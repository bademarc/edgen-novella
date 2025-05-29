// Audio management system for the visual novel
class AudioManager {
  constructor() {
    this.backgroundMusic = null;
    this.currentSoundEffect = null;
    this.volumes = {
      master: 0.5,
      music: 0.3, // -40dB equivalent (approximately 0.01 to 0.1)
      sfx: 0.7
    };

    // Load settings from localStorage
    this.loadSettings();

    // Initialize background music
    this.initBackgroundMusic();
  }

  // Initialize background music with looping
  initBackgroundMusic() {
    try {
      this.backgroundMusic = new Audio('/Music Background/Classroom Vibes.mp3');
      this.backgroundMusic.loop = true;
      this.backgroundMusic.preload = 'auto';

      // Set initial volume (-40dB equivalent)
      this.updateMusicVolume();

      // Handle loading errors
      this.backgroundMusic.addEventListener('error', (e) => {
        console.warn('Background music failed to load:', e);
      });

      // Auto-play when ready (with user interaction)
      this.backgroundMusic.addEventListener('canplaythrough', () => {
        console.log('Background music loaded successfully');
      });

    } catch (error) {
      console.warn('Failed to initialize background music:', error);
    }
  }

  // Start background music (requires user interaction)
  async startBackgroundMusic() {
    if (!this.backgroundMusic) return;

    try {
      // Reset to beginning and play
      this.backgroundMusic.currentTime = 0;
      await this.backgroundMusic.play();
      console.log('Background music started');
    } catch (error) {
      console.warn('Failed to start background music:', error);
      // Retry on next user interaction (especially important for mobile)
      const retryEvents = ['click', 'touchend', 'keydown'];
      retryEvents.forEach(event => {
        document.addEventListener(event, () => this.retryBackgroundMusic(), { once: true });
      });
    }
  }

  // Retry background music on user interaction
  async retryBackgroundMusic() {
    if (!this.backgroundMusic || !this.backgroundMusic.paused) return;

    try {
      await this.backgroundMusic.play();
      console.log('Background music resumed');
    } catch (error) {
      console.warn('Still unable to play background music:', error);
    }
  }

  // Play sound effect for specific scene
  async playSoundEffect(sceneNumber) {
    try {
      // Stop current sound effect if playing
      if (this.currentSoundEffect) {
        this.currentSoundEffect.pause();
        this.currentSoundEffect.currentTime = 0;
      }

      // Load and play new sound effect
      const soundPath = `/sounds/${sceneNumber}.wav`;
      this.currentSoundEffect = new Audio(soundPath);
      this.currentSoundEffect.preload = 'auto';

      // Set volume
      this.updateSfxVolume();

      // Play the sound effect
      await this.currentSoundEffect.play();
      console.log(`Playing sound effect: ${soundPath}`);

      // Clean up when finished
      this.currentSoundEffect.addEventListener('ended', () => {
        this.currentSoundEffect = null;
      });

    } catch (error) {
      console.warn(`Failed to play sound effect for scene ${sceneNumber}:`, error);
    }
  }

  // Update master volume
  setMasterVolume(volume) {
    this.volumes.master = Math.max(0, Math.min(1, volume));
    this.updateAllVolumes();
    this.saveSettings();
  }

  // Update music volume
  setMusicVolume(volume) {
    this.volumes.music = Math.max(0, Math.min(1, volume));
    this.updateMusicVolume();
    this.saveSettings();
  }

  // Update sound effects volume
  setSfxVolume(volume) {
    this.volumes.sfx = Math.max(0, Math.min(1, volume));
    this.updateSfxVolume();
    this.saveSettings();
  }

  // Update background music volume
  updateMusicVolume() {
    if (this.backgroundMusic) {
      this.backgroundMusic.volume = this.volumes.master * this.volumes.music;
    }
  }

  // Update sound effects volume
  updateSfxVolume() {
    if (this.currentSoundEffect) {
      this.currentSoundEffect.volume = this.volumes.master * this.volumes.sfx;
    }
  }

  // Update all volumes
  updateAllVolumes() {
    this.updateMusicVolume();
    this.updateSfxVolume();
  }

  // Get current volumes
  getVolumes() {
    return { ...this.volumes };
  }

  // Save settings to localStorage
  saveSettings() {
    try {
      localStorage.setItem('visualNovelAudioSettings', JSON.stringify(this.volumes));
    } catch (error) {
      console.warn('Failed to save audio settings:', error);
    }
  }

  // Load settings from localStorage
  loadSettings() {
    try {
      const saved = localStorage.getItem('visualNovelAudioSettings');
      if (saved) {
        const settings = JSON.parse(saved);
        this.volumes = { ...this.volumes, ...settings };
      }
    } catch (error) {
      console.warn('Failed to load audio settings:', error);
    }
  }

  // Stop all audio
  stopAll() {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
    }
    if (this.currentSoundEffect) {
      this.currentSoundEffect.pause();
      this.currentSoundEffect.currentTime = 0;
    }
  }

  // Resume background music
  resumeBackgroundMusic() {
    if (this.backgroundMusic && this.backgroundMusic.paused) {
      this.backgroundMusic.play().catch(console.warn);
    }
  }

  // Pause background music
  pauseBackgroundMusic() {
    if (this.backgroundMusic && !this.backgroundMusic.paused) {
      this.backgroundMusic.pause();
    }
  }
}

// Export the AudioManager class
export default AudioManager;
