export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}

export const getRandomRotation = (max: number = 5): number => {
  return Math.random() * max * 2 - max
}

export const colors = {
  peach: '#FFE5D0',
  mint: '#D4F4DD', 
  lavender: '#E5D4F1',
  sky: '#D0E7FF',
  kraft: '#F5E6D3',
  cream: '#FFF8F0'
}

export const getContrastTextColor = (bgColor: string): string => {
  // Simple contrast checker - return dark or light text
  const hex = bgColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  
  return brightness > 155 ? '#4A5568' : '#F7FAFC'
} 