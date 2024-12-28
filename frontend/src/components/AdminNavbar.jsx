import { useState } from "react"
import { Link } from "react-router-dom"
import "./AdminNavbar.css"

function AdminNavbar({ children }) {
  // Use a single state object for managing pressed states
  const [pressedLinks, setPressedLinks] = useState({
    katalog: false,
    salg: false,
    kunder: false,
    markedsføring: false,
    rapporter: false,
  })

  const [burgerToggle, setBurgerToggle] = useState(false)

  // Toggle function to update the link state(s)
  const toggleLinkState = (linkName) => {
    setPressedLinks((prev) => ({
      ...prev,
      [linkName]: !prev[linkName],
    }))
  }

  return (
    <section className="adminNavbars">
      <div className="adminSidebar">
        <h1 className="logo">
          <Link
            onClick={() => setPressedLinks({})}
            className="link"
            to="/admin-instrumentpanel"
          >
            <div className="logo-wide adminLogo">BUTIKKNAVN</div>
            <div className="logo-narrow adminLogo">BN</div>
          </Link>
        </h1>
        <nav className="sideNav">
          <ul>
            {/* <li>
              <Link className="link">
                <span>
                  <img src="/admin/icons8-bell-96.png" alt="" />
                  Instrumentpanel
                </span>
              </Link>
            </li> */}
            {[
              {
                name: "instrumentpanel",
                text: "Instrumentpanel",
                image: "/admin/icons8-dashboard-58.png",
              },
              {
                name: "katalog",
                text: "Katalog",
                image: "/admin/icons8-tag-50.png",
              },
              {
                name: "salg",
                text: "Salg",
                image: "/admin/icons8-cart-48.png",
              },
              {
                name: "Brukere",
                text: "Brukere",
                image: "/admin/icons8-customer-50.png",
              },
              // { name: "markedsføring", text: "Markedsføring" },
              // { name: "rapporter", text: "Rapporter" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  to={`/admin-${link.name}`}
                  className="link"
                  onClick={() => toggleLinkState(link.name)}
                >
                  <span>
                    <img src={link.image} alt={link.text} />
                    {link.text}
                  </span>
                  {pressedLinks[link.name] ? (
                    <i className="fa fa-chevron-down"></i>
                  ) : (
                    <i className="fa fa-chevron-right"></i>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="rightContainer">
        <div className="adminNavbar">
          {/* <h1 className="logo">
          <Link onClick={() => setPressedLinks({})} className="link" to="/">
            <div className="logo-wide">BUTIKKNAVN</div>
            <div className="logo-narrow">BN</div>
          </Link>
        </h1> */}
          <div className="leftContainer">
            <div
              className="burger"
              onClick={() => setBurgerToggle(!burgerToggle)}
            >
              <div className={`line1 ${burgerToggle && "line1-toggle"}`}></div>
              <div className={`line2 ${burgerToggle && "line2-toggle"}`}></div>
              <div className={`line3 ${burgerToggle && "line3-toggle"}`}></div>
            </div>
            <div className="searchBar">
              <i className="fa fa-search"></i>
              <input type="text" />
            </div>
          </div>
          <div className="cornerPanel">
            <div className="icons">
              <button className="icon">
                <img src="/admin/icons8-settings-100.png" alt="" />
              </button>
              <button className="icon">
                <img src="/admin/icons8-grid-96.png" alt="" />
              </button>
              <button className="icon">
                <img src="/admin/icons8-menu-vertical-100.png" alt="" />
              </button>
              <button className="icon">
                <img src="/admin/icons8-bell-96.png" alt="" />
              </button>
            </div>
            <button className="profileImageContainer">
              <img
                src="/admin/icons8-profile-picture-96.png"
                alt="profileImage"
              />
            </button>
          </div>
        </div>
        <div className="children">{children}</div>
      </div>
    </section>
  )
}

export default AdminNavbar
