import { useRef } from 'react'
import '../css/CasePreview.css'

// hearts + stars are emoji grids, rest are css
const emojiPatterns = { hearts: '💗', stars: '⭐' }

// stickers = [{ emoji, x, y }] x and y are % of the case
export default function CasePreview({
  color = '#FFC1D6',
  pattern = 'none',
  stickers = [],
  charm = '',
  editable = false, // true = can drag
  onMove,
  onRemove
}) {
  const caseRef = useRef(null)
  const dragging = useRef(null) // index of sticker being dragged

  const startDrag = (e, i) => {
    if (!editable) return
    e.preventDefault()
    dragging.current = i
    e.currentTarget.setPointerCapture(e.pointerId) // keeps drag going
  }

  const drag = (e) => {
    if (dragging.current === null) return
    const box = caseRef.current.getBoundingClientRect()
    // mouse position -> % of case, stay inside edges
    const x = Math.min(88, Math.max(12, ((e.clientX - box.left) / box.width) * 100))
    const y = Math.min(93, Math.max(7, ((e.clientY - box.top) / box.height) * 100))
    onMove(dragging.current, x, y)
  }

  const stopDrag = () => {
    dragging.current = null
  }

  return (
    <div className="preview-wrap">
      <div className="case" ref={caseRef} style={{ backgroundColor: color }}>

        {/* pattern layer */}
        {emojiPatterns[pattern] ? (
          <div className="pattern-emoji">
            {Array(60).fill(emojiPatterns[pattern]).map((e, i) => (
              <span key={i}>{e}</span>
            ))}
          </div>
        ) : (
          pattern !== 'none' && <div className={`pattern pattern-${pattern}`} />
        )}

        {/* camera bump */}
        <div className="camera">
          <span></span>
          <span></span>
        </div>

        {/* stickers */}
        {stickers.map((s, i) => (
          <div
            key={i}
            className={`sticker ${editable ? 'editable' : ''}`}
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            onPointerDown={(e) => startDrag(e, i)}
            onPointerMove={drag}
            onPointerUp={stopDrag}
          >
            {s.emoji}
            {editable && (
              <span
                className="sticker-x"
                onPointerDown={(e) => {
                  e.stopPropagation() // dont start drag
                  onRemove(i)
                }}
              >
                ×
              </span>
            )}
          </div>
        ))}
      </div>

      {/* charm hangs off bottom */}
      {charm && (
        <div className="charm">
          <div className="charm-string"></div>
          <span className="charm-emoji">{charm}</span>
        </div>
      )}
    </div>
  )
}