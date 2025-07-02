import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface BaseElement {
  id: string
  type: 'note' | 'sticky' | 'todo' | 'washi' | 'sticker'
  position: Position
  zIndex: number
  createdAt: number
}

export interface NoteElement extends BaseElement {
  type: 'note'
  content: string
  size: Size
  color: string
  fontSize: number
  fontFamily: string
  highlights: Array<{ start: number; end: number; color: string }>
  rotation?: number
}

export interface StickyElement extends BaseElement {
  type: 'sticky'
  content: string
  size: Size
  color: string
  rotation: number
}

export interface TodoElement extends BaseElement {
  type: 'todo'
  title: string
  items: Array<{ id: string; text: string; completed: boolean }>
  color: string
  size: Size
  rotation?: number
}

export interface WashiElement extends BaseElement {
  type: 'washi'
  color: string
  pattern: string
  size: Size
  rotation: number
}

export interface StickerElement extends BaseElement {
  type: 'sticker'
  emoji: string
  size: number
  rotation: number
}

export type CanvasElement = NoteElement | StickyElement | TodoElement | WashiElement | StickerElement

export interface CanvasState {
  elements: CanvasElement[]
  selectedElement: string | null
  isDragging: boolean
  canvasSize: Size
}

export interface CanvasActions {
  addElement: (element: CanvasElement) => void
  updateElement: (id: string, updates: Partial<CanvasElement>) => void
  deleteElement: (id: string) => void
  selectElement: (id: string | null) => void
  setDragging: (isDragging: boolean) => void
  bringToFront: (id: string) => void
  getMaxZIndex: () => number
}

export const useCanvasStore = create<CanvasState & CanvasActions>()(
  persist(
    (set, get) => ({
      // State
      elements: [],
      selectedElement: null,
      isDragging: false,
      canvasSize: { width: window.innerWidth, height: window.innerHeight },

      // Actions
      addElement: (element) =>
        set((state) => ({
          elements: [...state.elements, element],
        })),

      updateElement: (id, updates) =>
        set((state) => ({
          elements: state.elements.map((el) =>
            el.id === id ? { ...el, ...updates } as CanvasElement : el
          ),
        })),

      deleteElement: (id) =>
        set((state) => ({
          elements: state.elements.filter((el) => el.id !== id),
          selectedElement: state.selectedElement === id ? null : state.selectedElement,
        })),

      selectElement: (id) =>
        set(() => ({
          selectedElement: id,
        })),

      setDragging: (isDragging) =>
        set(() => ({
          isDragging,
        })),

      bringToFront: (id) =>
        set((state) => {
          const maxZ = Math.max(...state.elements.map((el) => el.zIndex), 0)
          return {
            elements: state.elements.map((el) =>
              el.id === id ? { ...el, zIndex: maxZ + 10 } : el
            ),
          }
        }),

      getMaxZIndex: () => {
        const { elements } = get()
        return elements.length > 0 ? Math.max(...elements.map((el) => el.zIndex)) : 0
      },
    }),
    {
      name: 'kawaii-canvas-storage',
      partialize: (state) => ({
        elements: state.elements,
      }),
    }
  )
) 