// Settings management for the visual novel
class SettingsManager {
  constructor(audioManager) {
    this.audioManager = audioManager;
    
    // DOM elements
    this.elements = {
      masterVolume: document.getElementById('master-volume'),
      musicVolume: document.getElementById('music-volume'),
      sfxVolume: document.getElementById('sfx-volume'),
      masterVolumeValue: document.getElementById('master-volume-value'),
      musicVolumeValue: document.getElementById('music-volume-value'),
      sfxVolumeValue: document.getElementById('sfx-volume-value')
    };
    
    this.init();
  }

  // Initialize settings
  init() {
    this.setupEventListeners();
    this.loadCurrentSettings();
  }

  // Setup event listeners for volume controls
  setupEventListeners() {
    // Master volume
    this.elements.masterVolume.addEventListener('input', (e) => {
      const value = parseFloat(e.target.value) / 100;
      this.audioManager.setMasterVolume(value);
      this.updateVolumeDisplay('master', e.target.value);
    });

    // Music volume
    this.elements.musicVolume.addEventListener('input', (e) => {
      const value = parseFloat(e.target.value) / 100;
      this.audioManager.setMusicVolume(value);
      this.updateVolumeDisplay('music', e.target.value);
    });

    // Sound effects volume
    this.elements.sfxVolume.addEventListener('input', (e) => {
      const value = parseFloat(e.target.value) / 100;
      this.audioManager.setSfxVolume(value);
      this.updateVolumeDisplay('sfx', e.target.value);
    });

    // Real-time volume updates while dragging
    this.elements.masterVolume.addEventListener('mousemove', (e) => {
      if (e.buttons === 1) { // Left mouse button is pressed
        this.updateVolumeDisplay('master', e.target.value);
      }
    });

    this.elements.musicVolume.addEventListener('mousemove', (e) => {
      if (e.buttons === 1) {
        this.updateVolumeDisplay('music', e.target.value);
      }
    });

    this.elements.sfxVolume.addEventListener('mousemove', (e) => {
      if (e.buttons === 1) {
        this.updateVolumeDisplay('sfx', e.target.value);
      }
    });
  }

  // Load current settings from audio manager
  loadCurrentSettings() {
    const volumes = this.audioManager.getVolumes();
    
    // Set slider values (convert from 0-1 to 0-100)
    this.elements.masterVolume.value = Math.round(volumes.master * 100);
    this.elements.musicVolume.value = Math.round(volumes.music * 100);
    this.elements.sfxVolume.value = Math.round(volumes.sfx * 100);
    
    // Update displays
    this.updateVolumeDisplay('master', this.elements.masterVolume.value);
    this.updateVolumeDisplay('music', this.elements.musicVolume.value);
    this.updateVolumeDisplay('sfx', this.elements.sfxVolume.value);
  }

  // Update volume display text
  updateVolumeDisplay(type, value) {
    const displayValue = `${value}%`;
    
    switch (type) {
      case 'master':
        this.elements.masterVolumeValue.textContent = displayValue;
        break;
      case 'music':
        this.elements.musicVolumeValue.textContent = displayValue;
        break;
      case 'sfx':
        this.elements.sfxVolumeValue.textContent = displayValue;
        break;
    }
  }

  // Reset to default settings
  resetToDefaults() {
    this.audioManager.setMasterVolume(0.5);
    this.audioManager.setMusicVolume(0.3);
    this.audioManager.setSfxVolume(0.7);
    this.loadCurrentSettings();
  }

  // Get current settings
  getCurrentSettings() {
    return {
      master: parseInt(this.elements.masterVolume.value),
      music: parseInt(this.elements.musicVolume.value),
      sfx: parseInt(this.elements.sfxVolume.value)
    };
  }

  // Apply settings from object
  applySettings(settings) {
    if (settings.master !== undefined) {
      this.elements.masterVolume.value = settings.master;
      this.audioManager.setMasterVolume(settings.master / 100);
      this.updateVolumeDisplay('master', settings.master);
    }
    
    if (settings.music !== undefined) {
      this.elements.musicVolume.value = settings.music;
      this.audioManager.setMusicVolume(settings.music / 100);
      this.updateVolumeDisplay('music', settings.music);
    }
    
    if (settings.sfx !== undefined) {
      this.elements.sfxVolume.value = settings.sfx;
      this.audioManager.setSfxVolume(settings.sfx / 100);
      this.updateVolumeDisplay('sfx', settings.sfx);
    }
  }

  // Test sound effect (play a sample sound)
  testSoundEffect() {
    // Play the first sound effect as a test
    this.audioManager.playSoundEffect(1);
  }

  // Mute all audio
  muteAll() {
    this.applySettings({ master: 0, music: 0, sfx: 0 });
  }

  // Unmute all audio (restore to reasonable defaults)
  unmuteAll() {
    this.applySettings({ master: 50, music: 30, sfx: 70 });
  }
}

export default SettingsManager;
