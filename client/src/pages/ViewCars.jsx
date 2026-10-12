import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CasePreview from '../components/CasePreview'
import { getAllCases, deleteCase } from '../services/CasesAPI'
import { getColors, getPatterns, getStickers, getCharms } from '../services/OptionsAPI'
import '../css/ViewCases.css'

const ViewCars = () => {
  const [cases, setCases] = useState([])
  const [colors, setColors] = useState([])
  const [patterns, setPatterns] = useState([])
  const [stickers, setStickers] = useState([])
  const [charms, setCharms] = useState([])
  const [loading, setLoading] = useState(true)

  // load cases + options once
  useEffect(() => {
    const load = async () => {
      const [cs, c, p, s, ch] = await Promise.all([
        getAllCases(), getColors(), getPatterns(), getStickers(), getCharms()
      ])
      setCases(Array.isArray(cs) ? cs : []) // safe if api sends an error
      setColors(c)
      setPatterns(p)
      setStickers(s)
      setCharms(ch)
      setLoading(false)
    }
    load()
  }, [])

  // delete then remove from screen
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this case? 🥺')) return
    await deleteCase(id)
    setCases(cases.filter((c) => c.id !== id))
  }

  if (loading) return <p className="list-msg">loading... 🎀</p>

  if (cases.length === 0) {
    return (
      <div className="list-msg">
        <h2>No cases yet!</h2>
        <Link to="/">Go make your first one 💖</Link>
      </div>
    )
  }

  return (
    <div className="case-grid">
      {cases.map((item) => {
        // find the full option for each saved id
        const color = colors.find((c) => c.id === item.color_id)
        const pattern = patterns.find((p) => p.id === item.pattern_id)
        const charm = charms.find((c) => c.id === item.charm_id)

        // match saved stickers to their emoji + position
        const placedStickers = (item.stickers || [])
          .map((p) => {
            const s = stickers.find((st) => st.id === p.sticker_id)
            return s ? { emoji: s.emoji, x: p.x, y: p.y } : null
          })
          .filter(Boolean)

        return (
          <div className="case-card" key={item.id}>
            {/* small version of preview */}
            <div className="thumb">
              <div className="thumb-inner">
                <CasePreview
                  color={color?.hex}
                  pattern={pattern?.type}
                  stickers={placedStickers}
                  charm={charm?.emoji}
                />
              </div>
            </div>

            <h3>{item.name}</h3>
            <p>${Number(item.total_price).toFixed(2)}</p>

            <div className="card-buttons">
              <Link to={`/customcars/${item.id}`} role="button">View</Link>
              <Link to={`/edit/${item.id}`} role="button">Edit</Link>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ViewCars