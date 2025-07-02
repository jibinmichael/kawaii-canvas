import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Canvas from './components/Canvas'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-screen h-screen overflow-hidden bg-gradient-to-br from-kawaii-cream to-kawaii-soft-gray">
        <Canvas />
      </div>
    </DndProvider>
  )
}

export default App 