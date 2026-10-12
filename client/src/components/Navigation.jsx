import { Link } from 'react-router-dom'
import '../css/Navigation.css'

const Navigation = () => {
  return (
    <nav className="top-nav">
      <Link to="/" className="logo">Cutie Case 🎀</Link>
      <div className="nav-buttons">
        <Link to="/" role="button">Design</Link>
        <Link to="/customcars" role="button">My Cases</Link>
      </div>
    </nav>
  )
}

export default Navigation