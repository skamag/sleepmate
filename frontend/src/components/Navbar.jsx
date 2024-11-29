import { Link } from "react-router-dom"
import "./navbar.css"

function Navbar() {
  return (
    <div className="navbarContainer">
      <h1 className="logo">BUTIKKNAVN</h1>
      <nav className="navbar">
        <ul>
          <li>
            <Link className="link" to="/">
              Hjem
            </Link>
          </li>
          <li>
            <Link className="link" to="/about">
              Om oss
            </Link>
          </li>
          <li>
            <Link className="link" to="/products">
              Produkter
            </Link>
          </li>
          <li>
            <Link className="link" to="/contact">
              Kontakt
            </Link>
          </li>
        </ul>
      </nav>
      <div className="searchLoginCart"></div>
    </div>
  )
}

export default Navbar
