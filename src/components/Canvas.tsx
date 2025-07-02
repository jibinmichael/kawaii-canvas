import React, { useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { useDrop } from 'react-dnd'
import { useCanvasStore } from '../state/store'
import Toolbar from './Toolbar'
import { generateId } from '../utils/helpers'

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null)
  const { 
    elements, 
    addElement, 
    selectElement, 
    updateElement,
    getMaxZIndex
  } = useCanvasStore()

  const [{ isOver }, drop] = useDrop({
    accept: ['note', 'sticky', 'todo', 'washi', 'sticker'],
    drop: (item: any, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset()
      if (delta && item.id) {
        const element = elements.find(el => el.id === item.id)
        if (element) {
          updateElement(item.id, {
            position: {
              x: element.position.x + delta.x,
              y: element.position.y + delta.y
            }
          })
        }
      }
      return { moved: true }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    })
  })

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    // Only create note if clicking directly on canvas background
    if (e.target === canvasRef.current && !e.defaultPrevented) {
      const rect = canvasRef.current!.getBoundingClientRect()
      const x = Math.max(50, e.clientX - rect.left - 100) // Offset to center cursor in note
      const y = Math.max(50, e.clientY - rect.top - 50)

      const newNote = {
        id: generateId(),
        type: 'note' as const,
        position: { x, y },
        content: '',
        size: { width: 200, height: 120 },
        color: '#FFE5D0',
        fontSize: 14,
        fontFamily: 'Comic Neue, cursive',
        highlights: [],
        zIndex: getMaxZIndex() + 10,
        createdAt: Date.now()
      }

      addElement(newNote)
      selectElement(newNote.id)
    }
  }, [addElement, selectElement, getMaxZIndex])

  return (
    <div className="relative w-full h-full">
      <motion.div
        ref={(node) => {
          drop(node)
          canvasRef.current = node
        }}
        className={`canvas-background paper-style-plain w-full h-full relative cursor-crosshair select-none ${isOver ? 'bg-blue-50' : ''}`}
        style={{ 
          minHeight: '100vh', 
          paddingBottom: '120px',
          backgroundColor: 'var(--canvas-bg-color, #f5f5f5)'
        }}
        onClick={handleCanvasClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Kawaii background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 text-6xl">🌸</div>
          <div className="absolute top-40 right-32 text-4xl">☁️</div>
          <div className="absolute bottom-32 left-1/4 text-5xl">🌙</div>
          <div className="absolute bottom-20 right-20 text-4xl">⭐</div>
          <div className="absolute top-1/3 left-1/2 text-3xl">🍃</div>
        </div>

        {/* Elements will be rendered here once we add them back */}
        {/* {elements
          .sort((a, b) => a.zIndex - b.zIndex)
          .map(renderElement)} */}

        {/* Helper text when canvas is empty */}
        {elements.length === 0 && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="text-center text-gray-400 font-kawaii">
              <div className="text-4xl mb-4">✨</div>
              <div className="text-lg">Clean canvas ready for your design</div>
              <div className="text-sm mt-2">Use the toolbar below to add elements</div>
            </div>
          </motion.div>
        )}
      </motion.div>
      
      {/* Toolbar */}
      <Toolbar />
    </div>
  )
}

export default Canvas 