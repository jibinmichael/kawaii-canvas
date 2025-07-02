import React from 'react'
import { motion } from 'framer-motion'

interface StickerWheelProps {
  onStickerSelect: (emoji: string) => void
  onClose: () => void
}

const StickerWheel: React.FC<StickerWheelProps> = ({ onStickerSelect, onClose }) => {
  const stickerPacks = {
    kawaii: ['🌸', '🎀', '💖', '🌙', '⭐', '🍓', '🧸', '🎈'],
    nature: ['🌺', '🌻', '🌿', '🍀', '🦋', '🐝', '🌳', '🍄'],
    food: ['🍰', '🧁', '🍪', '🍭', '🍯', '🍎', '🍊', '🥨'],
    cosmic: ['🌟', '✨', '🌙', '☀️', '🪐', '🌠', '💫', '🌕']
  }

  const allStickers = Object.values(stickerPacks).flat()
  const centerX = 120
  const centerY = 120
  const radius = 80

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
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <svg width="240" height="240" className="drop-shadow-2xl">
          {/* Background circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius + 15}
            fill="white"
            stroke="#E5E7EB"
            strokeWidth="3"
          />
          
          {/* Sticker segments */}
          {allStickers.map((sticker, index) => {
            const angle = (index * 360) / allStickers.length
            const x = centerX + radius * Math.cos((angle - 90) * Math.PI / 180)
            const y = centerY + radius * Math.sin((angle - 90) * Math.PI / 180)

            return (
              <g key={`${sticker}-${index}`}>
                <motion.circle
                  cx={x}
                  cy={y}
                  r="18"
                  fill="white"
                  stroke="#E5E7EB"
                  strokeWidth="2"
                  className="cursor-pointer"
                  onClick={() => onStickerSelect(sticker)}
                  whileHover={{ r: 22 }}
                  whileTap={{ r: 16 }}
                />
                <text
                  x={x}
                  y={y + 6}
                  textAnchor="middle"
                  fontSize="20"
                  className="cursor-pointer pointer-events-none"
                >
                  {sticker}
                </text>
              </g>
            )
          })}

          {/* Center kawaii face */}
          <circle
            cx={centerX}
            cy={centerY}
            r={35}
            fill="white"
            stroke="#E5E7EB"
            strokeWidth="3"
          />
          
          {/* Happy face */}
          <circle cx={centerX - 10} cy={centerY - 8} r="3" fill="#FF8A80" />
          <circle cx={centerX + 10} cy={centerY - 8} r="3" fill="#FF8A80" />
          <path
            d={`M ${centerX - 12} ${centerY + 10} Q ${centerX} ${centerY + 20} ${centerX + 12} ${centerY + 10}`}
            stroke="#FF8A80"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Sparkles */}
          <text x={centerX - 25} y={centerY - 25} fontSize="12">✨</text>
          <text x={centerX + 20} y={centerY - 30} fontSize="10">⭐</text>
          <text x={centerX + 25} y={centerY + 30} fontSize="8">💫</text>
        </svg>
      </motion.div>
    </motion.div>
  )
}

export default StickerWheel 