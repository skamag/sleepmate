import { useState } from "react"
import { Link } from "react-router-dom"
import "./navbar.css"

function Navbar() {
  const [isSearch, setIsSearch] = useState(false)
  const [isCart, setIsCart] = useState(false)
  const [isBurgerToggle, setIsBurgerToggle] = useState(false)

  const searchToggle = () => {
    isSearch ? setIsSearch(false) : setIsSearch(true)
  }

  const cartToggle = () => {
    isCart ? setIsCart(false) : setIsCart(true)
  }

  const toggleBurger = () => {
    isBurgerToggle ? setIsBurgerToggle(false) : setIsBurgerToggle(true)
  }

  const resetNavbar = () => {
    setIsSearch(false)
    setIsCart(false)
    setIsBurgerToggle(false)
  }

  return (
    <div className="navbar">
      <h1 className="logo">
        <Link onClick={() => resetNavbar()} className="link" to="/">
          <div className="logo-wide">BUTIKKNAVN</div>
          <div className="logo-narrow">BN</div>
        </Link>
      </h1>
      <nav
        className={`navLinksContainer ${isBurgerToggle && "navList-toggle"}`}
      >
        <ul>
          <li>
            <Link onClick={() => resetNavbar()} className="link" to="/">
              Hjem
            </Link>
          </li>
          <li>
            <Link onClick={() => resetNavbar()} className="link" to="/om">
              Om oss
            </Link>
          </li>
          <li>
            <Link
              onClick={() => resetNavbar()}
              className="link"
              to="/produkter"
            >
              Produkter
            </Link>
          </li>
          <li>
            <Link onClick={() => resetNavbar()} className="link" to="/kontakt">
              Kontakt
            </Link>
          </li>
        </ul>
      </nav>
      <div className="searchLoginCart">
        <div className="searchContainer">
          {isSearch ? (
            <div className="searchInputSection">
              <i className="fa fa-search" onClick={() => searchToggle()}></i>
              <input type="text" />
            </div>
          ) : (
            <i className="fa fa-search" onClick={() => searchToggle()}></i>
          )}
        </div>
        {!isSearch && (
          <>
            <div className="loginContainer">
              <Link
                onClick={() => resetNavbar()}
                className="link"
                to="/innlogging"
              >
                <div className="login-wide">Logg inn</div>
                <div className="login-narrow">
                  <i className="fa fa-user"></i>
                </div>
              </Link>
            </div>
            <div className="cartSection">
              <div
                className="cartText-wide pointer"
                onClick={() => cartToggle()}
                tabIndex={0}
              >
                Handlevogn
              </div>
              <div
                className="pointer"
                onClick={() => cartToggle()}
                tabIndex={0}
              >
                <i className="fa fa-shopping-cart"></i>
              </div>
              {isCart && (
                <div className="cartPreview">
                  <h5>Varer i handlevogn:</h5>

                  {[0, 1, 2].map((item) => (
                    <>
                      <div className="previewProductCard">
                        <div className="cardImage">
                          <img src="" />
                        </div>
                        <div className="cardText">Produktnavn</div>
                      </div>
                    </>
                  ))}

                  <Link
                    onClick={() => resetNavbar()}
                    className="link"
                    to="/handlevogn"
                  >
                    <button className="toCartButton">Gå til handlevogn</button>
                  </Link>
                </div>
              )}
            </div>
            <div className="burger" onClick={() => toggleBurger()}>
              <div
                className={`line1 ${isBurgerToggle && "line1-toggle"}`}
              ></div>
              <div
                className={`line2 ${isBurgerToggle && "line2-toggle"}`}
              ></div>
              <div
                className={`line3 ${isBurgerToggle && "line3-toggle"}`}
              ></div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
