import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useDrag } from 'react-dnd'
import { useCanvasStore, StickerElement } from '../../state/store'
import { X, RotateCw, Zap } from 'lucide-react'
import StickerWheel from '../common/StickerWheel'

interface StickerProps {
  element: StickerElement
}

const Sticker: React.FC<StickerProps> = ({ element }) => {
  const [showStickerWheel, setShowStickerWheel] = useState(false)
  const { updateElement, deleteElement, bringToFront } = useCanvasStore()

  const [{ isDragging }, drag] = useDrag({
    type: 'sticker',
    item: { id: element.id, type: 'sticker' },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
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

  const handleEmojiChange = (emoji: string) => {
    updateElement(element.id, { emoji })
    setShowStickerWheel(false)
  }

  const handleSizeChange = (delta: number) => {
    const newSize = Math.max(20, Math.min(80, element.size + delta))
    updateElement(element.id, { size: newSize })
  }

  const handleRotate = () => {
    updateElement(element.id, { rotation: (element.rotation + 15) % 360 })
  }

  const randomizeSticker = () => {
    const kawaiEmojis = ['🌸', '🎀', '💖', '🌙', '⭐', '🍓', '🧸', '🎈', '🌈', '☁️']
    const randomEmoji = kawaiEmojis[Math.floor(Math.random() * kawaiEmojis.length)]
    updateElement(element.id, { emoji: randomEmoji, rotation: Math.random() * 40 - 20 })
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    bringToFront(element.id)
  }
  
  return (
    <motion.div
      ref={drag}
      className={`absolute ${isDragging ? 'opacity-50 cursor-grabbing' : 'cursor-grab'}`}
      style={{
        left: element.position.x,
        top: element.position.y,
        width: element.size,
        height: element.size,
        zIndex: element.zIndex,
        transform: `rotate(${element.rotation}deg)`,
        userSelect: 'none'
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      whileHover={!isDragging ? { scale: 1.1 } : {}}
      onClick={handleClick}
    >
      <div className="relative h-full group">
        <div
          className="sticker-shadow w-full h-full flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/50"
          style={{ fontSize: element.size * 0.6 }}
        >
          {element.emoji}
        </div>

        {/* Controls */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1" style={{ zIndex: 10000 }}>
          <motion.button
            onClick={(e) => { e.stopPropagation(); setShowStickerWheel(!showStickerWheel) }}
            className={`w-6 h-6 rounded-full shadow-sm flex items-center justify-center ${
              showStickerWheel ? 'bg-purple-100 border-2 border-purple-300' : 'bg-white hover:bg-gray-50'
            }`}
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-xs">🎡</span>
          </motion.button>
          
          <motion.button
            onClick={(e) => { e.stopPropagation(); handleRotate() }}
            className="w-6 h-6 bg-white rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50"
          >
            <RotateCw size={10} />
          </motion.button>
          
          <motion.button
            onClick={(e) => { e.stopPropagation(); randomizeSticker() }}
            className="w-6 h-6 bg-white rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50"
          >
            <Zap size={10} />
          </motion.button>
          
          <motion.button
            onClick={(e) => { e.stopPropagation(); deleteElement(element.id) }}
            className="w-6 h-6 bg-red-100 rounded-full shadow-sm flex items-center justify-center hover:bg-red-200"
          >
            <X size={10} />
          </motion.button>
        </div>

        {/* Size controls */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <motion.button
            onClick={(e) => { e.stopPropagation(); handleSizeChange(-5) }}
            className="w-5 h-5 bg-white rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 text-xs"
          >-</motion.button>
          <motion.button
            onClick={(e) => { e.stopPropagation(); handleSizeChange(5) }}
            className="w-5 h-5 bg-white rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 text-xs"
          >+</motion.button>
        </div>

        {/* Sticker Wheel */}
        {showStickerWheel && (
          <StickerWheel
            onStickerSelect={handleEmojiChange}
            onClose={() => setShowStickerWheel(false)}
          />
        )}
      </div>
    </motion.div>
  )
}

export default Sticker 