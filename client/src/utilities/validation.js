export const MAX_STICKERS = 5
const busyPatterns = ['hearts', 'stars', 'checkers']

// camera is top left, numbers are % of the case
const camera = { xMax: 50, yMax: 33 }

// returns error message or '' if ok
export const validateCase = ({ pattern, placed }) => {
  if (placed.length > MAX_STICKERS) {
    return `Too many stickers! Your case needs room to breathe 🎀 (max ${MAX_STICKERS})`
  }
  if (pattern && busyPatterns.includes(pattern.type) && placed.length > 3) {
    return `${pattern.name} is already a busy pattern! Pick 3 stickers or less ✨`
  }
  const coversCamera = placed.some((p) => p.x < camera.xMax && p.y < camera.yMax)
  if (coversCamera) {
    return 'A sticker is covering the camera! Move it so you can take cute pics 📸'
  }
  return ''
}