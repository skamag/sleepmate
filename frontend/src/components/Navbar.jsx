import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import "./navbar.css"

function Navbar({
  data,
  setSelectedProduct,
  resetNavbar,
  isSearch,
  setIsSearch,
  isCart,
  setIsCart,
  isBurgerToggle,
  setIsBurgerToggle,
  searchText,
  setSearchText,
  // cartProducts,
  // setCartProducts,
}) {
  const { cart, setCart } = useCart()

  const searchToggle = () => {
    if (isSearch) {
      setIsSearch(false)
    } else {
      setIsSearch(true)
      setIsCart(false)
    }
    setSearchText("")
  }

  const cartToggle = () => {
    isCart ? setIsCart(false) : setIsCart(true)
  }

  const toggleBurger = () => {
    // isBurgerToggle ? setIsBurgerToggle(false) : setIsBurgerToggle(true)

    if (isBurgerToggle) {
      setIsBurgerToggle(false)
    } else {
      setIsBurgerToggle(true)
      setIsCart(false)
      window.addEventListener("scroll", function checkScroll() {
        if (window.scrollY > 5) {
          setIsBurgerToggle(false)
          window.removeEventListener("scroll", checkScroll)
        }
      })
    }
  }

  return (
    <>
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
              <Link
                onClick={() => resetNavbar()}
                className="link"
                to="/kontakt"
              >
                Kontakt
              </Link>
            </li>
          </ul>
        </nav>
        <div className="searchLoginCart">
          <div className="searchContainer">
            {/* {isSearch ? (
              <div className="searchInputSection">
                <button onClick={() => searchToggle()}>
                  <span>&#10006;</span>
                </button>
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            ) : (
              <button onClick={() => searchToggle()}>
                <i className="fa fa-search"></i>
              </button>
            )} */}
            <div
              className={`searchInputSection ${
                isSearch ? "search-active" : "search-inactive"
              }`}
            >
              <button
                onClick={() => searchToggle()}
                aria-label="Aktiver søkefelt"
              >
                {isSearch ? (
                  <span>&#10006;</span>
                ) : (
                  <i className="fa fa-search"></i>
                )}
              </button>
              <input
                className={`${
                  isSearch ? "searchInput-active" : "searchInput-inactive"
                }`}
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            {isSearch && searchText !== "" && (
              <div className="searchResults">
                <ul>
                  {data
                    .filter((item) =>
                      item.name.toLowerCase().includes(searchText.toLowerCase())
                    )
                    .map((filteredItem) => (
                      <Link
                        className="searchResult link"
                        key={filteredItem.id}
                        to={"/produktside"}
                        onClick={() => {
                          setSelectedProduct(filteredItem.id)
                          resetNavbar()
                        }}
                      >
                        <div className="imageContainer">
                          <img src={filteredItem.images[0]} alt="" />
                        </div>
                        <div>{filteredItem.name}</div>
                      </Link>
                    ))}
                </ul>
              </div>
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
                <button
                  className="cartText-wide pointer"
                  onClick={() => cartToggle()}
                  tabIndex={0}
                  aria-label="Forhåndsvis handlevogn"
                >
                  Handlevogn
                </button>
                <button
                  className="cartIconContainer"
                  onClick={() => cartToggle()}
                  aria-label="Forhåndsvis handlevogn"
                >
                  <i className="fa fa-shopping-cart"></i>
                  {cart > 0 && (
                    <div className="cartIconCircle">{cart.length}</div>
                  )}
                </button>
                {isCart && (
                  <div className="cartPreview">
                    <h5>Varer i handlevogn:</h5>

                    {cart.map((item) => (
                      <div
                        className="previewProductCard"
                        key={item.id + " preview"}
                      >
                        <div className="cardImage">
                          <img src={item.images[0]} />
                        </div>
                        <div className="cardText">{item.name}</div>
                        <div className="cardAmount"></div>
                        <button
                          className="cartRemove"
                          onClick={() =>
                            setCart(
                              cart.filter((product) => product.id !== item.id)
                            )
                          }
                          aria-label={`Fjern ${item.name} (id: '${item.id}') fra handlevogn`}
                        >
                          &#10006;
                        </button>
                      </div>
                    ))}

                    <Link
                      onClick={() => resetNavbar()}
                      className="toCartLink link"
                      to="/handlevogn"
                    >
                      <button
                        className="toCartButton"
                        aria-label="Gå til handlevogn"
                      >
                        Gå til handlevogn
                      </button>
                    </Link>
                  </div>
                )}
              </div>
              <button
                className="burger"
                onClick={() => toggleBurger()}
                aria-label={`${isBurgerToggle ? "Lukk" : "Åpne"} sidemeny`}
              >
                <div
                  className={`line1 ${isBurgerToggle && "line1-toggle"}`}
                ></div>
                <div
                  className={`line2 ${isBurgerToggle && "line2-toggle"}`}
                ></div>
                <div
                  className={`line3 ${isBurgerToggle && "line3-toggle"}`}
                ></div>
              </button>
            </>
          )}
        </div>
      </div>
      {isBurgerToggle && <div className="darkScreen"></div>}
    </>
  )
}

export default Navbar
