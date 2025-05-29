# 📖 Visual Novel Game

A modern, responsive visual novel game built with vanilla JavaScript, featuring immersive storytelling, character interactions, and a beautiful user interface optimized for all devices.

## ✨ Features

- **📱 Mobile-First Design** - Fully responsive and optimized for mobile devices
- **🎮 Interactive Storytelling** - Engaging narrative with character dialogue
- **🎵 Audio System** - Background music and sound effects with volume controls
- **⚙️ Settings Management** - Customizable audio settings with persistent storage
- **🖼️ High-Quality Visuals** - Beautiful character artwork and backgrounds
- **🔄 Scene Management** - Smooth transitions between story scenes
- **💾 Auto-Save** - Automatic progress saving and loading
- **🎯 Touch-Friendly** - Optimized touch controls for mobile gameplay
- **🌐 Cross-Platform** - Works on desktop, tablet, and mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd visual-novel-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`
   - The game will automatically reload when you make changes

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## 🎮 How to Play

1. **Start the Game** - Click "Start Game" from the main menu
2. **Navigate Scenes** - Click anywhere on the screen to advance dialogue
3. **Adjust Settings** - Use the settings menu to control audio levels
4. **Mobile Controls** - Tap the screen to progress through the story

## 📁 Project Structure

```
visual-novel-game/
├── src/
│   ├── main.js          # Main game logic and initialization
│   ├── style.css        # Responsive styles and mobile optimizations
│   └── assets/          # Game assets (images, audio)
├── index.html           # Main HTML file with mobile meta tags
├── package.json         # Project dependencies and scripts
├── vite.config.js       # Vite build configuration
└── README.md           # This file
```

## 🛠️ Technical Details

### Built With

- **Vanilla JavaScript** - Pure JS for optimal performance
- **CSS3** - Modern CSS with responsive design
- **Vite** - Fast build tool and development server
- **HTML5** - Semantic markup with mobile optimization

### Key Components

- **Game Manager** - Handles scene progression and game state
- **Audio Manager** - Controls background music and sound effects
- **Settings Manager** - Manages user preferences and storage
- **Mobile Viewport Handler** - Ensures proper mobile display

### Mobile Optimizations

- **Viewport Constraints** - Prevents zooming and ensures proper scaling
- **Touch Event Handling** - Optimized touch controls for mobile devices
- **Image Scaling** - Automatic image resizing for mobile screens
- **Responsive Design** - Adaptive layouts for all screen sizes

## 🎨 Customization

### Adding New Scenes

1. Add scene data to the game manager
2. Include character images in the assets folder
3. Update the scene progression logic

### Modifying Styles

- Edit `src/style.css` for visual customizations
- Mobile-specific styles are in media queries
- CSS custom properties for easy theming

### Audio Integration

- Add audio files to the assets folder
- Update the audio manager configuration
- Ensure proper file formats for web compatibility

## 📱 Mobile Support

This game is specifically optimized for mobile devices:

- **Responsive Images** - Images scale to fit mobile screens completely
- **Touch Controls** - Intuitive tap-to-advance gameplay
- **Viewport Locking** - Prevents unwanted zooming and scrolling
- **Orientation Support** - Works in both portrait and landscape modes
- **Performance Optimized** - Smooth gameplay on mobile devices

## 🚀 Deployment

### Vercel (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

### Other Platforms

The built files in `dist/` can be deployed to any static hosting service:
- Netlify
- GitHub Pages
- Firebase Hosting
- AWS S3

## � Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build locally
```

### Development Tips

- **Hot Reload** - Changes are automatically reflected in the browser
- **Console Debugging** - Use browser dev tools to debug game state
- **Mobile Testing** - Use browser device emulation for mobile testing
- **Performance** - Monitor performance with browser dev tools

### Code Structure

- **Modular Design** - Each component is self-contained
- **Event-Driven** - Uses event listeners for user interactions
- **State Management** - Centralized game state handling
- **Error Handling** - Comprehensive error catching and reporting

## 🎯 Game Features

### Story System
- **Linear Narrative** - Guided storytelling experience
- **Character Development** - Rich character interactions
- **Scene Transitions** - Smooth progression between story beats
- **Progress Tracking** - Automatic scene counting and progress

### Audio System
- **Background Music** - Atmospheric audio tracks
- **Sound Effects** - Interactive audio feedback
- **Volume Controls** - Separate music and SFX volume sliders
- **Mute Options** - Quick audio disable functionality

### Visual System
- **High-Resolution Art** - Crisp character and background images
- **Responsive Scaling** - Automatic image sizing for all devices
- **Smooth Animations** - CSS transitions for polished feel
- **Loading States** - Visual feedback during asset loading

## �🐛 Troubleshooting

### Common Issues

**Images not displaying on mobile:**
- Ensure images are properly sized and optimized
- Check that `object-fit: contain` is applied
- Verify image paths are correct
- Test with different image formats (JPG, PNG, WebP)

**Audio not playing:**
- Verify audio files are in supported formats (MP3, OGG)
- Check browser autoplay policies
- Ensure user interaction before playing audio
- Test audio file paths and accessibility

**Touch controls not working:**
- Ensure touch event handlers are properly attached
- Check for conflicting CSS that might block interactions
- Verify viewport meta tags are correctly set
- Test on actual mobile devices, not just browser emulation

**Performance issues:**
- Optimize image file sizes
- Check for memory leaks in JavaScript
- Monitor network requests in dev tools
- Consider lazy loading for large assets

### Browser Compatibility

- **Chrome/Chromium** - Full support
- **Firefox** - Full support
- **Safari** - Full support (including iOS)
- **Edge** - Full support
- **Mobile Browsers** - Optimized for mobile Chrome, Safari, Firefox

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Character artwork and backgrounds from various artists
- Audio assets from royalty-free sources
- Built with modern web technologies for optimal performance

---

**Enjoy your visual novel adventure!** 🎮✨
