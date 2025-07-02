import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useDrag } from 'react-dnd'
import { useCanvasStore, StickyElement } from '../../state/store'
import { getContrastTextColor } from '../../utils/helpers'
import { X, Palette, RotateCw, RotateCcw } from 'lucide-react'

interface StickyNoteProps {
  element: StickyElement
}

const StickyNote: React.FC<StickyNoteProps> = ({ element }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { updateElement, deleteElement, bringToFront } = useCanvasStore()

  const colors = ['#FFE5D0', '#D4F4DD', '#E5D4F1', '#D0E7FF', '#F5E6D3', '#FFF8F0']

  const [{ isDragging }, drag] = useDrag({
    type: 'sticky',
    item: { id: element.id, type: 'sticky' },
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
    }
  }, [isEditing])

  const handleContentChange = (content: string) => {
    updateElement(element.id, { content })
    
    // Auto-resize based on content length
    const lines = content.split('\n').length
    const newHeight = Math.max(120, 60 + (lines * 20) + (content.length > 50 ? 20 : 0))
    updateElement(element.id, { 
      content,
      size: { ...element.size, height: newHeight }
    })
  }

  const handleColorChange = (color: string) => {
    updateElement(element.id, { color })
    setShowColorPicker(false)
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
    if (!isDragging) {
      setIsEditing(true)
    }
  }

  const handleBlur = () => {
    setIsEditing(false)
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
        transform: `rotate(${element.rotation}deg)`,
        userSelect: isEditing ? 'text' : 'none'
      }}
      initial={{ scale: 0.8, opacity: 0, rotate: element.rotation }}
      animate={{ scale: 1, opacity: 1, rotate: element.rotation }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      whileHover={!isDragging ? { scale: 1.05 } : {}}
      onClick={handleClick}
    >
      <div
        className="relative h-full p-4 shadow-kawaii rounded-none group"
        style={{ 
          backgroundColor: element.color,
          clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0 100%)'
        }}
      >
        {/* Sticky note fold */}
        <div 
          className="absolute top-0 right-0 w-6 h-6 opacity-20"
          style={{
            background: `linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.1) 50%)`,
            clipPath: 'polygon(50% 0, 100% 0, 100% 50%)'
          }}
        />

        {/* Control buttons */}
        <div className="absolute -top-10 -left-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1" style={{ zIndex: 10000 }}>
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
              setShowColorPicker(!showColorPicker)
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
              deleteElement(element.id)
            }}
            className="w-6 h-6 bg-red-100 rounded-full shadow-sm flex items-center justify-center hover:bg-red-200"
            whileHover={{ scale: 1.1 }}
            title="Delete"
          >
            <X size={12} />
          </motion.button>
        </div>

        {/* Color picker */}
        {showColorPicker && (
          <motion.div
            className="absolute -top-12 left-0 bg-white rounded-lg p-2 shadow-lg border flex gap-1 z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className="w-6 h-6 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
              />
            ))}
          </motion.div>
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
            className="kawaii-input w-full h-full resize-none text-sm cursor-text"
            style={{ color: textColor, zIndex: 10 }}
            placeholder="Quick note..."
            autoFocus
          />
        ) : (
          <div
            className="w-full h-full overflow-hidden whitespace-pre-wrap break-words text-sm cursor-text"
            style={{ color: textColor }}
          >
            {element.content || 'Click to edit...'}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default StickyNote 