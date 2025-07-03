import { useState } from 'react'
import './Toolbar.css'

const Toolbar = () => {
  const [showTopToolbar, setShowTopToolbar] = useState(false)

  const toggleTopToolbar = () => {
    setShowTopToolbar(!showTopToolbar)
  }

  const colors = [
    '#ffffff', // White
    '#E6E6FA', // Soft Lavender
    '#FFE4E1', // Gentle Sakura Pink
    '#FFEAA7', // Warm Vanilla Cream
    '#FDCB6E', // Soft Peach
    '#A8E6CF', // Gentle Mint Green
    '#B8C5FF', // Soft Periwinkle Blue
    '#F8BBD9'  // Light Dusty Rose
  ]

  return (
    <>
      {/* Top Toolbar - Just visual colors */}
      <div className={`toolbar-top ${showTopToolbar ? 'active' : ''}`}>
        <div className="circle-panel-content">
          {/* Color Circles - Just visual, no functionality */}
          <div className="color-circles">
            {colors.map((color, index) => (
              <button
                key={index}
                className="color-circle"
                style={{ backgroundColor: color }}
                onClick={() => {/* No functionality */}}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Toolbar */}
      <div className="toolbar-bottom">
        {/* Zoom Controls - Just visual */}
        <div className="zoom-section">
          <button className="zoom-btn">−</button>
          <button className="zoom-btn">+</button>
        </div>

        {/* Circle - Only functional element */}
        <div className="circle-section" onClick={toggleTopToolbar}>
          <div className={`circle ${showTopToolbar ? 'active' : ''}`}></div>
        </div>

        {/* All other elements - Just visual, no functionality */}
        <div className="column sticky-note">
          <img src="/sticky-note-icon.svg" alt="Sticky Note" className="sticky-note-icon" />
        </div>

        <div className="column washi-tape">
          <img src="/washi-tape-icon.svg" alt="Washi Tape" className="washi-tape-icon" />
        </div>

        <div className="column todo">
          <img src="/todo-icon.svg" alt="Todo List" className="todo-icon" />
        </div>

        <div className="column sticker">
          <img src="/sticker-icon.svg" alt="Stickers" className="sticker-icon" />
        </div>

        <div className="column marker">
          <img src="/marker-icon.svg" alt="Marker" className="marker-icon" />
        </div>

        <div className="column image">
          <img src="/image-icon.svg" alt="Upload Image" className="image-icon" />
        </div>
      </div>
    </>
  )
}

export default Toolbar 