import React from 'react'
import { motion } from 'framer-motion'

interface MarkerToolProps {
  onColorSelect: (color: string) => void
  onClose: () => void
}

const MarkerTool: React.FC<MarkerToolProps> = ({ onColorSelect, onClose }) => {
  const markerColors = [
    '#FFFF00', // Yellow
    '#FFB6C1', // Pink  
    '#98FB98', // Light Green
    '#87CEEB', // Sky Blue
    '#DDA0DD', // Plum
    '#F0E68C', // Khaki
    '#FFA07A', // Light Salmon
    '#D3D3D3'  // Light Gray
  ]

  return (
    <motion.div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center"
      style={{ zIndex: 9999 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-2xl border"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-4">
          <div className="text-lg font-kawaii mb-2">🖍️ Choose Marker Color</div>
          <div className="text-sm text-gray-500">Select text first, then pick a color</div>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          {markerColors.map((color) => (
            <motion.button
              key={color}
              onClick={() => onColorSelect(color)}
              className="w-12 h-12 rounded-full border-4 border-white shadow-lg relative overflow-hidden"
              style={{ backgroundColor: color }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Marker tip effect */}
              <div 
                className="absolute inset-2 rounded-full opacity-80"
                style={{ backgroundColor: color, filter: 'brightness(1.2)' }}
              />
              
              {/* Shine effect */}
              <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full opacity-60" />
            </motion.button>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <motion.button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default MarkerTool 