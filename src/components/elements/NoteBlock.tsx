import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useDrag } from 'react-dnd'
import { useCanvasStore, NoteElement } from '../../state/store'
import { getContrastTextColor } from '../../utils/helpers'
import { X, Palette, Type, Highlighter, RotateCw, RotateCcw } from 'lucide-react'
import ResizeHandle from '../common/ResizeHandle'
import ColorWheel from '../common/ColorWheel'
import MarkerTool from '../common/MarkerTool'

interface NoteBlockProps {
  element: NoteElement
}

const NoteBlock: React.FC<NoteBlockProps> = ({ element }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [showColorWheel, setShowColorWheel] = useState(false)
  const [showFontMenu, setShowFontMenu] = useState(false)
  const [showMarkerTool, setShowMarkerTool] = useState(false)
  const [highlightColor, setHighlightColor] = useState('#FFFF00')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { updateElement, deleteElement, bringToFront } = useCanvasStore()

  const fonts = [
    { name: 'Comic Neue', style: 'Comic Neue, cursive' },
    { name: 'Kalam', style: 'Kalam, cursive' },
    { name: 'Caveat', style: 'Caveat, cursive' },
    { name: 'Indie Flower', style: 'Indie Flower, cursive' },
    { name: 'Handwriting', style: 'Kalam, Comic Neue, cursive' }
  ]

  const [{ isDragging }, drag] = useDrag({
    type: 'note',
    item: { id: element.id, type: 'note' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && monitor.didDrop() && dropResult) {
        const delta = monitor.getDifferenceFromInitialOffset()
        if (delta) {
          updateElement(element.id, {
            position: {
              x: element.position.x + delta.x,
              y: element.position.y + delta.y
            }
          })
        }
      }
    }
  })

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.select()
    }
  }, [isEditing])

  useEffect(() => {
    if (!element.content) {
      setIsEditing(true)
    }
  }, [element.content])

  const handleContentChange = (content: string) => {
    updateElement(element.id, { content })
  }

  const handleColorChange = (color: string) => {
    updateElement(element.id, { color })
    setShowColorWheel(false)
  }

  const handleFontChange = (fontFamily: string) => {
    updateElement(element.id, { fontFamily })
    setShowFontMenu(false)
  }

  const handleResize = (deltaX: number, deltaY: number) => {
    const newWidth = Math.max(150, element.size.width + deltaX)
    const newHeight = Math.max(80, element.size.height + deltaY)
    updateElement(element.id, { 
      size: { width: newWidth, height: newHeight } 
    })
  }

  const handleHighlight = () => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart
      const end = textareaRef.current.selectionEnd
      
      if (start !== end) {
        const newHighlight = { start, end, color: highlightColor }
        const updatedHighlights = [...element.highlights, newHighlight]
        updateElement(element.id, { highlights: updatedHighlights })
      }
    }
  }

  const handleRotate = (direction: 'left' | 'right') => {
    const currentRotation = element.rotation || 0
    const newRotation = direction === 'left' 
      ? currentRotation - 15 
      : currentRotation + 15
    updateElement(element.id, { rotation: newRotation })
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    bringToFront(element.id)
    if (!isEditing && !isDragging) {
      setIsEditing(true)
    }
  }

  const handleBlur = () => {
    setIsEditing(false)
    if (!element.content.trim()) {
      deleteElement(element.id)
    }
  }

  const textColor = getContrastTextColor(element.color)
  
  return (
    <motion.div
      ref={drag}
      className={`absolute ${isDragging ? 'opacity-50 cursor-grabbing' : 'cursor-grab'}`}
      style={{
        left: element.position.x,
        top: element.position.y,
        width: element.size.width,
        height: element.size.height,
        zIndex: element.zIndex,
        transform: `rotate(${element.rotation || 0}deg)`,
        userSelect: isEditing ? 'text' : 'none',
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      whileHover={!isDragging ? { scale: 1.02 } : {}}
      onClick={handleClick}
    >
      <div
        className="kawaii-paper torn-edge h-full p-4 relative group"
        style={{ backgroundColor: element.color }}
      >
        {/* Control buttons */}
        <div className="absolute -top-10 -right-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1" style={{ zIndex: 10000 }}>
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              handleRotate('left')
            }}
            className="w-6 h-6 bg-blue-100 rounded-full shadow-sm flex items-center justify-center hover:bg-blue-200"
            whileHover={{ scale: 1.1 }}
            title="Rotate Left"
          >
            <RotateCcw size={12} />
          </motion.button>
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              handleRotate('right')
            }}
            className="w-6 h-6 bg-blue-100 rounded-full shadow-sm flex items-center justify-center hover:bg-blue-200"
            whileHover={{ scale: 1.1 }}
            title="Rotate Right"
          >
            <RotateCw size={12} />
          </motion.button>
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              setShowColorWheel(!showColorWheel)
            }}
            className="w-6 h-6 bg-white rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50"
            whileHover={{ scale: 1.1 }}
            title="Change Color"
          >
            <Palette size={12} />
          </motion.button>
          
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              setShowFontMenu(!showFontMenu)
            }}
            className={`w-6 h-6 rounded-full shadow-sm flex items-center justify-center ${
              showFontMenu ? 'bg-blue-100 border-2 border-blue-300' : 'bg-white hover:bg-gray-50'
            }`}
            whileHover={{ scale: 1.1 }}
          >
            <Type size={12} />
          </motion.button>
          
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              setShowMarkerTool(!showMarkerTool)
            }}
            className={`w-6 h-6 rounded-full shadow-sm flex items-center justify-center ${
              showMarkerTool ? 'bg-yellow-200 border-2 border-yellow-400' : 'bg-yellow-100 hover:bg-yellow-200'
            }`}
            whileHover={{ scale: 1.1 }}
          >
            <Highlighter size={12} />
          </motion.button>
          
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              deleteElement(element.id)
            }}
            className="w-6 h-6 bg-red-100 rounded-full shadow-sm flex items-center justify-center hover:bg-red-200"
            whileHover={{ scale: 1.1 }}
          >
            <X size={12} />
          </motion.button>
        </div>

        {/* Color Wheel */}
        {showColorWheel && (
          <ColorWheel
            onColorSelect={handleColorChange}
            onClose={() => setShowColorWheel(false)}
          />
        )}

        {/* Font Menu */}
        {showFontMenu && (
          <motion.div
            className="absolute -top-40 left-0 bg-white rounded-lg p-3 shadow-lg border min-w-44"
            style={{ zIndex: 9998 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-xs text-gray-600 mb-2 font-medium">✏️ Font Family</div>
            {fonts.map((font) => (
              <motion.button
                key={font.name}
                onClick={() => handleFontChange(font.style)}
                className={`block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-sm transition-colors ${
                  element.fontFamily === font.style ? 'bg-blue-100 border border-blue-300' : ''
                }`}
                style={{ fontFamily: font.style }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {font.name}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Marker Tool */}
        {showMarkerTool && (
          <MarkerTool
            onColorSelect={(color) => {
              setHighlightColor(color)
              handleHighlight()
              setShowMarkerTool(false)
            }}
            onClose={() => setShowMarkerTool(false)}
          />
        )}

        {/* Content */}
        {isEditing ? (
          <textarea
            ref={textareaRef}
            value={element.content}
            onChange={(e) => handleContentChange(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                handleBlur()
              }
            }}
            onMouseDown={(e) => e.stopPropagation()}
            className="kawaii-input w-full h-full resize-none cursor-text"
            style={{ 
              color: textColor,
              fontSize: element.fontSize + 'px',
              fontFamily: element.fontFamily,
              zIndex: 10
            }}
            placeholder="Start writing..."
            autoFocus
          />
        ) : (
          <div
            className="w-full h-full overflow-hidden whitespace-pre-wrap break-words cursor-text"
            style={{ 
              color: textColor,
              fontSize: element.fontSize + 'px',
              fontFamily: element.fontFamily
            }}
          >
            {element.content || 'Click to edit...'}
          </div>
        )}

        {/* Resize Handle */}
        <ResizeHandle onResize={handleResize} />
      </div>
    </motion.div>
  )
}

export default NoteBlock 