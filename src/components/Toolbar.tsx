import { useState, useEffect } from 'react'
import './Toolbar.css'

const Toolbar = () => {
  const [selectedColor, setSelectedColor] = useState('#ffffff')
  const [selectedPaperStyle, setSelectedPaperStyle] = useState('plain')
  const [showCirclePanel, setShowCirclePanel] = useState(false)
  const [showStickyNotePanel, setShowStickyNotePanel] = useState(false)
  const [selectedStickyColor, setSelectedStickyColor] = useState('#FFE066')
  const [selectedStickyStyle, setSelectedStickyStyle] = useState('plain')
  const [showWashiTapePanel, setShowWashiTapePanel] = useState(false)
  const [selectedWashiColor, setSelectedWashiColor] = useState('#FF6B9D')
  const [selectedWashiStyle, setSelectedWashiStyle] = useState('solid')
  const [showStickerModal, setShowStickerModal] = useState(false)
  const [showMarkerPanel, setShowMarkerPanel] = useState(false)
  const [selectedMarkerColor, setSelectedMarkerColor] = useState('#FF6B9D')
  const [selectedMarkerWidth, setSelectedMarkerWidth] = useState('medium')
  const stickers = [
    '❤️', '👍', '➕', '⭐', '❓', '👎', '💗', 'J', 
    '😊', '🎉', '💖', '🚀', '✨', '🌈', '🦄', '🔮'
  ]



  const toggleCirclePanel = () => {
    setShowCirclePanel(!showCirclePanel)
    // Close other panels when circle is clicked
    setShowStickyNotePanel(false)
    setShowWashiTapePanel(false)
    setShowStickerModal(false)
    setShowMarkerPanel(false)
  }

  const toggleStickyNotePanel = () => {
    setShowStickyNotePanel(!showStickyNotePanel)
    // Close other panels when sticky note is clicked
    setShowCirclePanel(false)
    setShowWashiTapePanel(false)
    setShowStickerModal(false)
    setShowMarkerPanel(false)
  }

  const toggleWashiTapePanel = () => {
    setShowWashiTapePanel(!showWashiTapePanel)
    // Close other panels when washi tape is clicked
    setShowCirclePanel(false)
    setShowStickyNotePanel(false)
    setShowStickerModal(false)
    setShowMarkerPanel(false)
  }

  const handleTodoClick = () => {
    // Close all panels when todo is clicked
    setShowCirclePanel(false)
    setShowStickyNotePanel(false)
    setShowWashiTapePanel(false)
    setShowStickerModal(false)
    setShowMarkerPanel(false)
    // TODO: Add todo list functionality later
    console.log('Todo clicked - functionality to be added')
  }

  const toggleStickerModal = () => {
    setShowStickerModal(!showStickerModal)
    // Close other panels when sticker is clicked
    setShowCirclePanel(false)
    setShowStickyNotePanel(false)
    setShowWashiTapePanel(false)
    setShowMarkerPanel(false)
  }

  const toggleMarkerPanel = () => {
    setShowMarkerPanel(!showMarkerPanel)
    // Close other panels when marker is clicked
    setShowCirclePanel(false)
    setShowStickyNotePanel(false)
    setShowWashiTapePanel(false)
    setShowStickerModal(false)
  }

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
    // Apply background color to canvas
    document.documentElement.style.setProperty('--canvas-bg-color', color)
  }

  const handlePaperStyleSelect = (style: string) => {
    setSelectedPaperStyle(style)
    // Apply paper style to canvas while preserving other classes
    const canvas = document.querySelector('.canvas-background') as HTMLElement
    if (canvas) {
      // Remove old paper style classes
      canvas.classList.remove('paper-style-plain', 'paper-style-dotted', 'paper-style-striped')
      // Add new paper style class
      canvas.classList.add(`paper-style-${style}`)
    }
  }

  const handleStickyColorSelect = (color: string) => {
    setSelectedStickyColor(color)
    // Store selected sticky note color for when creating sticky notes
  }

  const handleStickyStyleSelect = (style: string) => {
    setSelectedStickyStyle(style)
    // Store selected sticky note style for when creating sticky notes
  }

  const handleWashiColorSelect = (color: string) => {
    setSelectedWashiColor(color)
    // Store selected washi tape color for when creating washi tape
  }

  const handleWashiStyleSelect = (style: string) => {
    setSelectedWashiStyle(style)
    // Store selected washi tape style for when creating washi tape
  }

  const handleMarkerColorSelect = (color: string) => {
    setSelectedMarkerColor(color)
    // Store selected marker color for when using marker tool
  }

  const handleMarkerWidthSelect = (width: string) => {
    setSelectedMarkerWidth(width)
    // Store selected marker width for when using marker tool
  }

  const handleImageClick = () => {
    // Close all panels when image is clicked
    setShowCirclePanel(false)
    setShowStickyNotePanel(false)
    setShowWashiTapePanel(false)
    setShowStickerModal(false)
    setShowMarkerPanel(false)
    // TODO: Add image upload functionality later
    console.log('Image upload clicked - functionality to be added')
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

  const stickyColors = [
    '#FFE066', // Classic Yellow
    '#FF8A80', // Coral Pink
    '#A5D6A7', // Fresh Green
    '#81C784', // Mint Green
    '#FFB74D', // Orange
    '#F48FB1', // Pink
    '#CE93D8', // Purple
    '#90CAF9'  // Light Blue
  ]

  const washiColors = [
    '#FF6B9D', // Hot Pink
    '#4ECDC4', // Turquoise
    '#FFE66D', // Bright Yellow
    '#95E1D3', // Mint
    '#F38BA8', // Rose
    '#A8DADC', // Powder Blue
    '#FFB3BA', // Light Pink
    '#BFDBFE'  // Sky Blue
  ]

  const markerColors = [
    '#FF6B9D', // Pink Highlighter
    '#FFE66D', // Yellow Highlighter  
    '#4ADE80', // Green Highlighter
    '#60A5FA', // Blue Highlighter
    '#FB923C', // Orange Highlighter
    '#A78BFA', // Purple Highlighter
    '#EF4444', // Red Pen
    '#1F2937'  // Black Pen
  ]

  // Initialize default styles on component mount
  useEffect(() => {
    // Set default background color
    document.documentElement.style.setProperty('--canvas-bg-color', selectedColor)
  }, [])

  return (
    <>


      {/* Top Panel - Circle Content */}
      <div className={`toolbar-top ${showCirclePanel ? 'active' : ''}`}>
        <div className="circle-panel-content">
          {/* Color Circles */}
          <div className="color-circles">
            {colors.map((color, index) => (
              <button
                key={index}
                className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
              />
            ))}
          </div>

          {/* Separator Line */}
          <div className="panel-separator" />

          {/* Paper Style Circles */}
          <div className="paper-style-circles">
            <button
              className={`paper-circle plain ${selectedPaperStyle === 'plain' ? 'selected' : ''}`}
              onClick={() => handlePaperStyleSelect('plain')}
            />
            <button
              className={`paper-circle dotted ${selectedPaperStyle === 'dotted' ? 'selected' : ''}`}
              onClick={() => handlePaperStyleSelect('dotted')}
            />
            <button
              className={`paper-circle striped ${selectedPaperStyle === 'striped' ? 'selected' : ''}`}
              onClick={() => handlePaperStyleSelect('striped')}
            />
          </div>
        </div>
      </div>

      {/* Top Panel - Sticky Note Content */}
      <div className={`toolbar-top ${showStickyNotePanel ? 'active' : ''}`}>
        <div className="circle-panel-content">
          {/* Sticky Note Color Circles */}
          <div className="color-circles">
            {stickyColors.map((color, index) => (
              <button
                key={index}
                className={`color-circle ${selectedStickyColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleStickyColorSelect(color)}
              />
            ))}
          </div>

          {/* Separator Line */}
          <div className="panel-separator" />

          {/* Sticky Note Style Circles */}
          <div className="paper-style-circles">
            <button
              className={`sticky-circle plain ${selectedStickyStyle === 'plain' ? 'selected' : ''}`}
              onClick={() => handleStickyStyleSelect('plain')}
            />
            <button
              className={`sticky-circle dotted ${selectedStickyStyle === 'dotted' ? 'selected' : ''}`}
              onClick={() => handleStickyStyleSelect('dotted')}
            />
            <button
              className={`sticky-circle lined ${selectedStickyStyle === 'lined' ? 'selected' : ''}`}
              onClick={() => handleStickyStyleSelect('lined')}
            />
          </div>
        </div>
      </div>

      {/* Top Panel - Washi Tape Content */}
      <div className={`toolbar-top ${showWashiTapePanel ? 'active' : ''}`}>
        <div className="circle-panel-content">
          {/* Washi Tape Color Circles */}
          <div className="color-circles">
            {washiColors.map((color, index) => (
              <button
                key={index}
                className={`color-circle ${selectedWashiColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleWashiColorSelect(color)}
              />
            ))}
          </div>

          {/* Separator Line */}
          <div className="panel-separator" />

          {/* Washi Tape Style Circles */}
          <div className="paper-style-circles">
            <button
              className={`washi-circle solid ${selectedWashiStyle === 'solid' ? 'selected' : ''}`}
              onClick={() => handleWashiStyleSelect('solid')}
            />
            <button
              className={`washi-circle pattern ${selectedWashiStyle === 'pattern' ? 'selected' : ''}`}
              onClick={() => handleWashiStyleSelect('pattern')}
            />
            <button
              className={`washi-circle decorative ${selectedWashiStyle === 'decorative' ? 'selected' : ''}`}
              onClick={() => handleWashiStyleSelect('decorative')}
            />
          </div>
        </div>
      </div>

      {/* Top Panel - Marker Content */}
      <div className={`toolbar-top ${showMarkerPanel ? 'active' : ''}`}>
        <div className="circle-panel-content">
          {/* Marker Color Circles */}
          <div className="color-circles">
            {markerColors.map((color, index) => (
              <button
                key={index}
                className={`color-circle ${selectedMarkerColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleMarkerColorSelect(color)}
              />
            ))}
          </div>

          {/* Separator Line */}
          <div className="panel-separator" />

          {/* Marker Width Circles */}
          <div className="paper-style-circles">
            <button
              className={`marker-width-circle thin ${selectedMarkerWidth === 'thin' ? 'selected' : ''}`}
              onClick={() => handleMarkerWidthSelect('thin')}
            />
            <button
              className={`marker-width-circle medium ${selectedMarkerWidth === 'medium' ? 'selected' : ''}`}
              onClick={() => handleMarkerWidthSelect('medium')}
            />
            <button
              className={`marker-width-circle thick ${selectedMarkerWidth === 'thick' ? 'selected' : ''}`}
              onClick={() => handleMarkerWidthSelect('thick')}
            />
          </div>
        </div>
      </div>

      {/* Sticker Modal - Apple Quality */}
      <div className={`sticker-modal ${showStickerModal ? 'active' : ''}`}>
        <div className="sticker-modal-header">
          <div className="sticker-search-container">
            <input 
              type="text" 
              className="sticker-search-input" 
              placeholder='Try typing "cats"'
            />
            <div className="sticker-search-icon">🔍</div>
          </div>
          <button className="sticker-close-btn" onClick={() => setShowStickerModal(false)}></button>
        </div>
        
        <div className="sticker-content">
          <div className="sticker-grid">
            {stickers.map((sticker: string, index: number) => (
              <div 
                key={index} 
                className="sticker-item" 
                onClick={() => {
                  console.log(`Selected: ${sticker}`)
                  setShowStickerModal(false)
                }}
              >
                {sticker}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Toolbar */}
      <div className="toolbar-bottom">
        {/* Zoom Controls */}
        <div className="zoom-section">
          <button className="zoom-btn">−</button>
          <button className="zoom-btn">+</button>
        </div>

        {/* Circle */}
        <div className="circle-section" onClick={toggleCirclePanel}>
          <div className={`circle ${showCirclePanel ? 'active' : ''}`}></div>
        </div>

        {/* Sticky Note Column */}
        <div
          className={`column sticky-note ${showStickyNotePanel ? 'active' : ''}`}
          onClick={toggleStickyNotePanel}
        >
          <img src="/sticky-note-icon.svg" alt="Sticky Note" className="sticky-note-icon" />
        </div>

        {/* Washi Tape Column */}
        <div
          className={`column washi-tape ${showWashiTapePanel ? 'active' : ''}`}
          onClick={toggleWashiTapePanel}
        >
          <img src="/washi-tape-icon.svg" alt="Washi Tape" className="washi-tape-icon" />
        </div>

        {/* Todo Column */}
        <div
          className="column todo"
          onClick={handleTodoClick}
        >
          <img src="/todo-icon.svg" alt="Todo List" className="todo-icon" />
        </div>

        {/* Sticker Column */}
        <div
          className={`column sticker ${showStickerModal ? 'active' : ''}`}
          onClick={toggleStickerModal}
        >
          <img src="/sticker-icon.svg" alt="Stickers" className="sticker-icon" />
        </div>

        {/* Marker Column */}
        <div
          className={`column marker ${showMarkerPanel ? 'active' : ''}`}
          onClick={toggleMarkerPanel}
        >
          <img src="/marker-icon.svg" alt="Marker" className="marker-icon" />
        </div>

        {/* Image Upload Column */}
        <div
          className="column image"
          onClick={handleImageClick}
        >
          <img src="/image-icon.svg" alt="Upload Image" className="image-icon" />
        </div>
      </div>
    </>
  )
}

export default Toolbar 