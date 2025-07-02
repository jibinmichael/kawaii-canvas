import React from 'react'
import { motion } from 'framer-motion'

interface ColorWheelProps {
  onColorSelect: (color: string) => void
  onClose: () => void
}

const ColorWheel: React.FC<ColorWheelProps> = ({ onColorSelect, onClose }) => {
  const colors = [
    '#FFE5D0', // peach
    '#D4F4DD', // mint
    '#E5D4F1', // lavender
    '#D0E7FF', // sky
    '#F5E6D3', // kraft
    '#FFF8F0', // cream
    '#FFB6C1', // pink
    '#E6F3FF', // light blue
    '#F0FFF0', // honeydew
    '#FFF0F5', // lavender blush
    '#FFFACD', // lemon chiffon
    '#F5F5DC'  // beige
  ]

  const centerX = 80
  const centerY = 80
  const radius = 60

  return (
    <motion.div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center"
      style={{ zIndex: 9999 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <svg width="160" height="160" className="drop-shadow-2xl">
          {/* Background circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius + 10}
            fill="white"
            stroke="#E5E7EB"
            strokeWidth="2"
          />
          
          {/* Color segments */}
          {colors.map((color, index) => {
            const angle = (index * 360) / colors.length
            const x1 = centerX + (radius - 20) * Math.cos((angle - 15) * Math.PI / 180)
            const y1 = centerY + (radius - 20) * Math.sin((angle - 15) * Math.PI / 180)
            const x2 = centerX + (radius + 5) * Math.cos((angle - 15) * Math.PI / 180)
            const y2 = centerY + (radius + 5) * Math.sin((angle - 15) * Math.PI / 180)
            const x3 = centerX + (radius + 5) * Math.cos((angle + 15) * Math.PI / 180)
            const y3 = centerY + (radius + 5) * Math.sin((angle + 15) * Math.PI / 180)
            const x4 = centerX + (radius - 20) * Math.cos((angle + 15) * Math.PI / 180)
            const y4 = centerY + (radius - 20) * Math.sin((angle + 15) * Math.PI / 180)

            return (
              <motion.path
                key={color}
                d={`M ${x1} ${y1} L ${x2} ${y2} A ${radius + 5} ${radius + 5} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${radius - 20} ${radius - 20} 0 0 0 ${x1} ${y1}`}
                fill={color}
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer"
                onClick={() => onColorSelect(color)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{ transformOrigin: `${centerX}px ${centerY}px` }}
              />
            )
          })}

          {/* Center circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={30}
            fill="white"
            stroke="#E5E7EB"
            strokeWidth="2"
          />
          
          {/* Smiley face */}
          <circle cx={centerX - 8} cy={centerY - 5} r="2" fill="#6B7280" />
          <circle cx={centerX + 8} cy={centerY - 5} r="2" fill="#6B7280" />
          <path
            d={`M ${centerX - 8} ${centerY + 8} Q ${centerX} ${centerY + 15} ${centerX + 8} ${centerY + 8}`}
            stroke="#6B7280"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}

export default ColorWheel 