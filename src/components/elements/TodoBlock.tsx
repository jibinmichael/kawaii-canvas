import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useDrag } from 'react-dnd'
import { useCanvasStore, TodoElement } from '../../state/store'
import { getContrastTextColor, generateId } from '../../utils/helpers'
import { X, Plus, Palette, RotateCw, RotateCcw } from 'lucide-react'

interface TodoBlockProps {
  element: TodoElement
}

const TodoBlock: React.FC<TodoBlockProps> = ({ element }) => {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const { updateElement, deleteElement, bringToFront } = useCanvasStore()

  const colors = ['#FFE5D0', '#D4F4DD', '#E5D4F1', '#D0E7FF', '#F5E6D3', '#FFF8F0']

  const [{ isDragging }, drag] = useDrag({
    type: 'todo',
    item: { id: element.id, type: 'todo' },
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

  const handleTitleChange = (title: string) => {
    updateElement(element.id, { title })
  }

  const handleItemChange = (itemId: string, text: string) => {
    const updatedItems = element.items.map(item =>
      item.id === itemId ? { ...item, text } : item
    )
    updateElement(element.id, { items: updatedItems })
    
    // Auto-grow height based on content
    const newHeight = Math.max(200, 120 + (updatedItems.length * 35))
    updateElement(element.id, { 
      items: updatedItems,
      size: { ...element.size, height: newHeight }
    })
  }

  const handleItemToggle = (itemId: string) => {
    const updatedItems = element.items.map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    )
    updateElement(element.id, { items: updatedItems })
  }

  const addNewItem = () => {
    const newItem = { id: generateId(), text: '', completed: false }
    const newItems = [...element.items, newItem]
    const newHeight = Math.max(200, 120 + (newItems.length * 35))
    
    updateElement(element.id, { 
      items: newItems,
      size: { ...element.size, height: newHeight }
    })
  }

  const removeItem = (itemId: string) => {
    const updatedItems = element.items.filter(item => item.id !== itemId)
    const newHeight = Math.max(200, 120 + (updatedItems.length * 35))
    
    updateElement(element.id, { 
      items: updatedItems,
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
  }

  const textColor = getContrastTextColor(element.color)
  const completedCount = element.items.filter(item => item.completed).length
  
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
        userSelect: 'none'
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      whileHover={!isDragging ? { scale: 1.02 } : {}}
      onClick={handleClick}
    >
      <div
        className="kawaii-paper h-full p-4 relative group overflow-hidden"
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

        {/* Title */}
        <input
          type="text"
          value={element.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          onMouseDown={(e) => e.stopPropagation()}
          className="kawaii-input text-lg font-semibold mb-3 w-full cursor-text"
          style={{ color: textColor, zIndex: 10 }}
          placeholder="To-Do List"
        />

        {/* Progress indicator */}
        <div className="mb-3">
          <div className="text-xs opacity-60" style={{ color: textColor }}>
            {completedCount} of {element.items.length} completed
          </div>
          <div className="w-full bg-black/10 rounded-full h-1 mt-1">
            <div
              className="bg-green-400 h-1 rounded-full transition-all duration-300"
              style={{ width: `${element.items.length > 0 ? (completedCount / element.items.length) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Todo items */}
        <div className="space-y-2">
          {element.items.map((item) => (
            <motion.div
              key={item.id}
              className="flex items-center gap-2 group/item"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <motion.button
                onClick={() => handleItemToggle(item.id)}
                className={`w-4 h-4 rounded border-2 flex items-center justify-center text-xs ${
                  item.completed 
                    ? 'bg-green-400 border-green-400 text-white' 
                    : 'border-gray-400 hover:border-green-400'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {item.completed && '✓'}
              </motion.button>
              
              <input
                type="text"
                value={item.text}
                onChange={(e) => handleItemChange(item.id, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addNewItem()
                  }
                }}
                onMouseDown={(e) => e.stopPropagation()}
                className={`kawaii-input flex-1 text-sm cursor-text ${item.completed ? 'line-through opacity-60' : ''}`}
                style={{ color: textColor, zIndex: 10 }}
                placeholder="New task... (Press Enter to add more)"
              />
              
              <motion.button
                onClick={() => removeItem(item.id)}
                className="opacity-0 group-hover/item:opacity-100 w-4 h-4 text-red-400 hover:text-red-600 text-xs rounded-full hover:bg-red-100 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Add button */}
        <motion.button
          onClick={addNewItem}
          className="mt-3 w-full flex items-center justify-center gap-1 text-sm py-2 rounded-lg border-2 border-dashed border-gray-300 opacity-60 hover:opacity-100 hover:border-gray-400 transition-all"
          style={{ color: textColor }}
          whileHover={{ scale: 1.02 }}
        >
          <Plus size={14} />
          Add item
        </motion.button>
      </div>
    </motion.div>
  )
}

export default TodoBlock 