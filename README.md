# 🌸 Kawaii Canvas - Cozy New Tab Extension

Transform your new tab into a delightful, kawaii-style journaling canvas with notes, stickers, and washi tape!

## ✨ Features

### 🎯 Core Elements
- **📝 Freeform Notes** - Click anywhere to start typing and create beautiful note blocks
- **📌 Sticky Notes** - Draggable, rotatable sticky notes with authentic paper styling
- **✅ Todo Lists** - Interactive checklist blocks with progress tracking
- **🧷 Washi Tape** - Decorative tape strips with patterns (stripes, dots, hearts, stars)
- **🎀 Kawaii Stickers** - Adorable emoji stickers with size and rotation controls

### 🎨 Aesthetic Design
- **Pastel Color Palette** - Soft peach, mint, lavender, sky blue, and kraft tones
- **Paper Textures** - Torn edges, subtle shadows, and authentic paper feel
- **Kawaii Animations** - Smooth, delightful micro-interactions using Framer Motion
- **Handwritten Fonts** - Comic Neue and Kalam for that personal journal feel

### 🔧 Interactive Features
- **Click-to-Create** - Simply click anywhere on the canvas to start writing
- **Drag & Drop** - Move any element freely around your canvas
- **Inline Editing** - Edit text directly with intuitive controls
- **Color Customization** - 6 beautiful color presets for each element type
- **Persistent Storage** - Your canvas automatically saves to localStorage
- **Responsive Design** - Works beautifully on any screen size

## 🚀 Quick Start

### Development
1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` to see your canvas

3. **Build for Production**
   ```bash
   npm run build:extension
   ```

### Chrome Extension Installation
1. **Build the Extension**
   ```bash
   npm run build:extension
   ```

2. **Load in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (top right toggle)
   - Click "Load unpacked"
   - Select the `dist` folder from this project
   - Open a new tab to see your Kawaii Canvas! 🎉

## 🎮 How to Use

### Getting Started
1. **Open a New Tab** - Your canvas appears automatically
2. **Click Anywhere** - Start typing immediately to create a note
3. **Use the Toolbar** - Add sticky notes, todos, washi tape, and stickers
4. **Customize Colors** - Hover over elements to see color options
5. **Drag to Arrange** - Move everything around to create your perfect layout

### Element Controls
- **📝 Notes**: Click to edit, hover for color picker and delete options
- **📌 Sticky Notes**: Automatically rotated for authentic look, click to edit
- **✅ Todos**: Add/remove items, check off completed tasks, track progress
- **🧷 Washi Tape**: Change colors and patterns, rotate for decoration
- **🎀 Stickers**: Change emoji, resize, rotate, randomize for fun surprises

## 🛠️ Tech Stack

- **⚛️ React 18** - Modern UI framework with hooks
- **🎬 Framer Motion** - Smooth animations and gestures
- **🎨 TailwindCSS** - Utility-first styling with custom kawaii theme
- **🖱️ React DnD** - Drag and drop functionality
- **🏪 Zustand** - Lightweight state management
- **📦 Vite** - Fast build tool and dev server
- **🎯 TypeScript** - Type safety throughout

## 📁 Project Structure

```
kawaii-canvas/
├── public/
│   ├── icons/           # Chrome extension icons
│   └── kawaii-icon.svg  # Main app icon
├── src/
│   ├── components/
│   │   ├── Canvas.tsx          # Main canvas component
│   │   ├── Toolbar.tsx         # Floating element toolbar
│   │   └── elements/
│   │       ├── NoteBlock.tsx   # Freeform text notes
│   │       ├── StickyNote.tsx  # Rotated sticky notes
│   │       ├── TodoBlock.tsx   # Interactive todo lists
│   │       ├── WashiTape.tsx   # Decorative tape strips
│   │       └── Sticker.tsx     # Kawaii emoji stickers
│   ├── state/
│   │   └── store.ts            # Zustand state management
│   ├── utils/
│   │   └── helpers.ts          # Utility functions
│   ├── App.tsx                 # Main app component
│   ├── main.tsx               # React entry point
│   └── index.css              # Global styles + Tailwind
├── manifest.json              # Chrome extension manifest
├── tailwind.config.js         # Custom kawaii color palette
└── package.json
```

## 🎨 Color Palette

Our carefully crafted kawaii color scheme:

- **🍑 Peach**: `#FFE5D0` - Warm and welcoming
- **🌿 Mint**: `#D4F4DD` - Fresh and calming  
- **💜 Lavender**: `#E5D4F1` - Soft and dreamy
- **☁️ Sky**: `#D0E7FF` - Light and airy
- **📜 Kraft**: `#F5E6D3` - Natural and cozy
- **🤍 Cream**: `#FFF8F0` - Pure and gentle

## 🌟 Customization

### Adding New Sticker Packs
Edit `src/components/elements/Sticker.tsx` to add your own emoji collections.

### Creating New Washi Patterns
Add patterns in `src/components/elements/WashiTape.tsx`.

### Custom Color Schemes
Modify `tailwind.config.js` to add your own color palette.

## 📝 Development Notes

- **State Persistence**: All canvas data saves automatically to localStorage
- **Drag Performance**: Uses react-dnd for smooth dragging across elements
- **Responsive**: Canvas adapts to any screen size gracefully
- **Accessibility**: Proper focus management and keyboard navigation
- **Chrome Extension**: Replaces new tab page completely for immersive experience

## 🎭 Design Philosophy

Kawaii Canvas is built around the Japanese concept of "kawaii" (cute/adorable) combined with the therapeutic benefits of journaling. Every interaction is designed to spark joy - from the gentle animations to the soft color palette to the handwritten-style fonts.

This isn't just another productivity tool - it's a creative sanctuary where organization meets artistic expression.

## 📄 License

MIT License - feel free to use this code for your own kawaii projects! 

---

**Made with 💖 for digital journaling enthusiasts worldwide**

*Click anywhere to start your kawaii journey! 🌸* 