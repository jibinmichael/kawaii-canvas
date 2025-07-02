import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'

interface ResizeHandleProps {
  onResize: (deltaX: number, deltaY: number) => void
  className?: string
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({ onResize, className = '' }) => {
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setStartPos({ x: e.clientX, y: e.clientY })

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startPos.x
      const deltaY = e.clientY - startPos.y
      onResize(deltaX, deltaY)
      setStartPos({ x: e.clientX, y: e.clientY })
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [onResize, startPos])

  return (
    <motion.div
      className={`absolute w-4 h-4 bg-blue-400 border-2 border-white rounded-full shadow-lg cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity ${className}`}
      style={{
        bottom: -8,
        right: -8,
        zIndex: 1000
      }}
      onMouseDown={handleMouseDown}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="absolute inset-1 bg-white rounded-full opacity-50" />
    </motion.div>
  )
}

export default ResizeHandle 