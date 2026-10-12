import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CasePreview from '../components/CasePreview'
import { getColors, getPatterns, getStickers, getCharms } from '../services/OptionsAPI'
import { getCase, updateCase } from '../services/CasesAPI'
import { calcPrice } from '../utilities/calcPrice'
import { validateCase } from '../utilities/validation'
import '../css/CreateCase.css'

const EditCar = () => {
  const { id } = useParams() // id from the url
  const navigate = useNavigate()

  // option lists from db
  const [colors, setColors] = useState([])
  const [patterns, setPatterns] = useState([])
  const [stickers, setStickers] = useState([])
  const [charms, setCharms] = useState([])

  // what user picked
  const [colorId, setColorId] = useState(null)
  const [patternId, setPatternId] = useState(null)
  const [charmId, setCharmId] = useState(null)
  const [placed, setPlaced] = useState([])
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  // load options + the saved case, fill in the picks
  useEffect(() => {
    const load = async () => {
      const [c, p, s, ch, saved] = await Promise.all([
        getColors(), getPatterns(), getStickers(), getCharms(), getCase(id)
      ])
      setColors(c)
      setPatterns(p)
      setStickers(s)
      setCharms(ch)
      setColorId(saved.color_id)
      setPatternId(saved.pattern_id)
      setCharmId(saved.charm_id)
      setPlaced(saved.stickers || [])
      setName(saved.name)
    }
    load()
  }, [id])

  if (!colors.length || colorId === null) return <p>loading... 🎀</p>

  // find full objects for what was picked
  const color = colors.find((c) => c.id === colorId)
  const pattern = patterns.find((p) => p.id === patternId)
  const charm = charms.find((c) => c.id === charmId)
  const pickedStickers = placed.map((p) => stickers.find((s) => s.id === p.sticker_id))

  const total = calcPrice({ color, pattern, stickers: pickedStickers, charm })

  const addSticker = (stickerId) => {
    setError('')
    const offset = placed.length % 5
    setPlaced([...placed, { sticker_id: stickerId, x: 35 + offset * 8, y: 55 + offset * 6 }])
  }

  // called while dragging
  const moveSticker = (index, x, y) => {
    setPlaced((prev) => prev.map((p, i) => (i === index ? { ...p, x, y } : p)))
  }

  const removeSticker = (index) => {
    setError('')
    setPlaced(placed.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    // check for impossible combos
    const problem = validateCase({ pattern, placed })
    if (problem) {
      setError(problem)
      return
    }

    const finalName = name.trim() || `${color.name} ${pattern.name === 'None' ? 'Case' : pattern.name}`

    await updateCase(id, {
      name: finalName,
      case_type: 'phone',
      color_id: colorId,
      pattern_id: patternId,
      charm_id: charmId,
      stickers: placed,
      total_price: total
    })
    navigate('/customcars')
  }

  // small price tag for buttons
  const tag = (price) => (Number(price) > 0 ? ` +$${Number(price).toFixed(2)}` : '')

  return (
    <div className="create-page">
      <div className="create-preview">
        <CasePreview
          color={color.hex}
          pattern={pattern.type}
          stickers={placed.map((p, i) => ({ emoji: pickedStickers[i].emoji, x: p.x, y: p.y }))}
          charm={charm.emoji}
          editable
          onMove={moveSticker}
          onRemove={removeSticker}
        />
        <h2>Total: ${total.toFixed(2)}</h2>
      </div>

      <div className="create-options">
        <div className="option-card">
          <h3>Base color</h3>
          <div className="option-row">
            {colors.map((c) => (
              <button
                key={c.id}
                className={`option-btn ${c.id === colorId ? 'selected' : ''}`}
                onClick={() => setColorId(c.id)}
              >
                <span className="swatch" style={{ background: c.hex }}></span>
                {c.name}{tag(c.price)}
              </button>
            ))}
          </div>
        </div>

        <div className="option-card">
          <h3>Pattern</h3>
          <div className="option-row">
            {patterns.map((p) => (
              <button
                key={p.id}
                className={`option-btn ${p.id === patternId ? 'selected' : ''}`}
                onClick={() => setPatternId(p.id)}
              >
                {p.name}{tag(p.price)}
              </button>
            ))}
          </div>
        </div>

        <div className="option-card wide">
          <h3>Stickers (click to add, drag to move)</h3>
          <div className="option-row">
            {stickers.map((s) => (
              <button key={s.id} className="option-btn" onClick={() => addSticker(s.id)}>
                {s.emoji} {s.name}{tag(s.price)}
              </button>
            ))}
          </div>
        </div>

        <div className="option-card">
          <h3>Charm</h3>
          <div className="option-row">
            {charms.map((ch) => (
              <button
                key={ch.id}
                className={`option-btn ${ch.id === charmId ? 'selected' : ''}`}
                onClick={() => setCharmId(ch.id)}
              >
                {ch.emoji} {ch.name}{tag(ch.price)}
              </button>
            ))}
          </div>
        </div>

        <div className="option-card">
          <h3>Name your case</h3>
          <input
            type="text"
            placeholder="leave blank for a surprise name ✨"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="option-card wide">
          {error && <p className="error-msg">{error}</p>}
          <button className="save-btn" onClick={handleSubmit}>Save changes 💖</button>
        </div>
      </div>
    </div>
  )
}

export default EditCar