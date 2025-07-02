import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useDrag } from 'react-dnd'
import { useCanvasStore, WashiElement } from '../../state/store'
import { X, Palette, RotateCw } from 'lucide-react'
import { washiTapeSystem } from '../WashiTapeSystem'

interface WashiTapeProps {
  element: WashiElement
}

const WashiTape: React.FC<WashiTapeProps> = ({ element }) => {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const { updateElement, deleteElement, bringToFront, elements } = useCanvasStore()
  const [isStuck, setIsStuck] = useState(false)

  const colors = ['#FFE5D0', '#D4F4DD', '#E5D4F1', '#D0E7FF', '#F5E6D3', '#FFF8F0']
  const patterns = ['stripes', 'dots', 'hearts', 'stars']

  const [{ isDragging }, drag] = useDrag({
    type: 'washi',
    item: { id: element.id, type: 'washi' },
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

  const handleColorChange = (color: string) => {
    updateElement(element.id, { color })
    setShowColorPicker(false)
  }

  const handlePatternChange = (pattern: string) => {
    updateElement(element.id, { pattern })
  }

  const handleRotate = () => {
    const newRotation = (element.rotation + 15) % 360
    updateElement(element.id, { rotation: newRotation })
    
    // Update connected elements
    washiTapeSystem.updateConnectedElements(element.id, {...element, rotation: newRotation}, updateElement)
  }

  // Check for attachments when tape moves
  useEffect(() => {
    washiTapeSystem.checkForAttachment(element, elements)
    const connections = washiTapeSystem.getConnections()
    setIsStuck(connections.some(conn => conn.tapeId === element.id))
  }, [element.position, elements])

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    bringToFront(element.id)
  }

  const getPatternStyle = () => {
    const baseStyle = { backgroundColor: element.color }
    
    switch (element.pattern) {
      case 'stripes':
        return {
          ...baseStyle,
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,0.3) 3px, rgba(255,255,255,0.3) 6px)`
        }
      case 'dots':
        return {
          ...baseStyle,
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 2px, transparent 2px)`,
          backgroundSize: '8px 8px'
        }
      case 'hearts':
        return {
          ...baseStyle,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 10C6 10 2 7 2 4.5C2 3 3 2 4.5 2S7 3 7 4.5C7 3 8 2 9.5 2S12 3 12 4.5C12 7 8 10 6 10z' fill='rgba(255,255,255,0.4)'/%3E%3C/svg%3E")`,
          backgroundSize: '12px 12px'
        }
      case 'stars':
        return {
          ...baseStyle,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath d='M5 0L6 3L10 3L7 5L8 8L5 6L2 8L3 5L0 3L4 3z' fill='rgba(255,255,255,0.4)'/%3E%3C/svg%3E")`,
          backgroundSize: '10px 10px'
        }
      default:
        return baseStyle
    }
  }
  
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
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      whileHover={!isDragging ? { scale: 1.05 } : {}}
      onClick={handleClick}
    >
      <div
        className="relative h-full group rounded-lg shadow-kawaii border-2 border-white/50"
        style={getPatternStyle()}
      >
        {/* Control buttons */}
        <div className="absolute -top-10 left-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1" style={{ zIndex: 10000 }}>
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              setShowColorPicker(!showColorPicker)
            }}
            className="w-6 h-6 bg-white rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50"
            whileHover={{ scale: 1.1 }}
          >
            <Palette size={12} />
          </motion.button>
          
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              handleRotate()
            }}
            className="w-6 h-6 bg-white rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50"
            whileHover={{ scale: 1.1 }}
          >
            <RotateCw size={12} />
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

        {/* Color and pattern picker */}
        {showColorPicker && (
          <motion.div
            className="absolute -top-20 left-0 bg-white rounded-lg p-3 shadow-lg border z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-2">
              <div className="text-xs text-gray-600 mb-1">Colors</div>
              <div className="flex gap-1">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className="w-5 h-5 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <div className="text-xs text-gray-600 mb-1">Patterns</div>
              <div className="flex gap-1">
                {patterns.map((pattern) => (
                  <button
                    key={pattern}
                    onClick={() => handlePatternChange(pattern)}
                    className={`px-2 py-1 text-xs rounded border hover:bg-gray-50 ${
                      element.pattern === pattern ? 'bg-blue-100 border-blue-300' : 'border-gray-200'
                    }`}
                  >
                    {pattern}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Washi tape shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30 rounded-lg" />
        
        {/* Stuck indicator */}
        {isStuck && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white animate-pulse" />
        )}
      </div>
    </motion.div>
  )
}

export default WashiTape 