import React from 'react'
import Toolbar from './Toolbar'

const Canvas: React.FC = () => {
  return (
    <div className="relative w-full h-full">
      <div
        className="canvas-background paper-style-plain w-full h-full relative select-none"
        style={{ 
          minHeight: '100vh', 
          paddingBottom: '120px',
          backgroundColor: 'var(--canvas-bg-color, #f5f5f5)'
        }}
      >
        {/* Kawaii background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 text-6xl">🌸</div>
          <div className="absolute top-40 right-32 text-4xl">☁️</div>
          <div className="absolute bottom-32 left-1/4 text-5xl">🌙</div>
          <div className="absolute bottom-20 right-20 text-4xl">⭐</div>
          <div className="absolute top-1/3 left-1/2 text-3xl">🍃</div>
        </div>

        {/* Clean canvas message */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-gray-400 font-kawaii">
            <div className="text-4xl mb-4">✨</div>
            <div className="text-lg">Clean canvas ready for your design</div>
            <div className="text-sm mt-2">Click the circle to show top toolbar</div>
          </div>
        </div>
      </div>
      
      {/* Toolbar */}
      <Toolbar />
    </div>
  )
}

export default Canvas 