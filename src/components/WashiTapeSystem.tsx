import { CanvasElement } from '../state/store'

interface WashiConnection {
  tapeId: string
  elementId: string
  offset: { x: number; y: number; rotation: number }
}

class WashiTapeSystem {
  private connections: WashiConnection[] = []
  
  // Attach an element to washi tape
  attachElement(tapeId: string, elementId: string, tapeElement: CanvasElement, element: CanvasElement) {
    // Calculate relative position and rotation
    const offset = {
      x: element.position.x - tapeElement.position.x,
      y: element.position.y - tapeElement.position.y,
      rotation: element.type === 'washi' ? 0 : tapeElement.type === 'washi' ? (tapeElement as any).rotation || 0 : 0
    }
    
    // Remove existing connection for this element
    this.connections = this.connections.filter(conn => conn.elementId !== elementId)
    
    // Add new connection
    this.connections.push({ tapeId, elementId, offset })
  }
  
  // Remove attachment
  detachElement(elementId: string) {
    this.connections = this.connections.filter(conn => conn.elementId !== elementId)
  }
  
  // Update connected elements when tape moves/rotates
  updateConnectedElements(tapeId: string, tapeElement: CanvasElement, updateElement: Function) {
    const connectedElements = this.connections.filter(conn => conn.tapeId === tapeId)
    
    connectedElements.forEach(connection => {
      const newPosition = {
        x: tapeElement.position.x + connection.offset.x,
        y: tapeElement.position.y + connection.offset.y
      }
      
      updateElement(connection.elementId, { position: newPosition })
    })
  }
  
  // Check if elements are close enough to attach (collision detection)
  checkForAttachment(tapeElement: CanvasElement, elements: CanvasElement[]) {
    if (tapeElement.type !== 'washi') return
    
    elements.forEach(element => {
      if (element.id === tapeElement.id || element.type === 'washi') return
      
      // Check if element overlaps with tape
      const tapeRect = {
        left: tapeElement.position.x,
        top: tapeElement.position.y,
        right: tapeElement.position.x + (tapeElement as any).size.width,
        bottom: tapeElement.position.y + (tapeElement as any).size.height
      }
      
      const elementRect = {
        left: element.position.x,
        top: element.position.y,
        right: element.position.x + (element as any).size?.width || 50,
        bottom: element.position.y + (element as any).size?.height || 50
      }
      
      // Simple overlap detection
      if (tapeRect.left < elementRect.right && 
          tapeRect.right > elementRect.left && 
          tapeRect.top < elementRect.bottom && 
          tapeRect.bottom > elementRect.top) {
        
        this.attachElement(tapeElement.id, element.id, tapeElement, element)
      }
    })
  }
  
  getConnections() {
    return this.connections
  }
}

export const washiTapeSystem = new WashiTapeSystem() 