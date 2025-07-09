import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import "./Navbar.css"

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
  isLoggedIn,
  handleLogout,
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
            <div className="logo-wide">
              SLEEP<span style={{ color: "#0066b2" }}>MATE</span>
            </div>
            <div className="logo-narrow">
              S<span style={{ color: "#0066b2" }}>M</span>
            </div>
            {/* <div className="logo-wide">BUTIKKNAVN</div>
            <div className="logo-narrow">BN</div> */}
          </Link>
        </h1>
        {!isSearch && (
          <nav
            className={`navLinksContainer ${
              isBurgerToggle && "navList-toggle"
            }`}
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
        )}
        <div
          className={`searchLoginCart ${
            isSearch ? "searchLoginCart-active" : "searchLoginCart-inactive"
          }`}
        >
          <div
            className={`searchContainer ${
              isSearch ? "searchContainer-active" : "searchContainer-inactive"
            }`}
          >
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
                {data.filter((item) =>
                  item.name.toLowerCase().includes(searchText.toLowerCase())
                ).length === 0 ? (
                  <p>Ingen søkeresultater...</p> // Show this message if no results are found
                ) : (
                  <ul>
                    {data
                      .filter((item) =>
                        item.name
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      )
                      .map((filteredItem) => (
                        <Link
                          className="searchResult link"
                          key={filteredItem._id}
                          to={"/produktside"}
                          onClick={() => {
                            setSelectedProduct(filteredItem._id)
                            resetNavbar()
                          }}
                        >
                          <div className="imageContainer">
                            <img src={filteredItem.images[0]} alt="" />
                          </div>
                          <div className="nameContainer">
                            {filteredItem.name.length > 75
                              ? `${filteredItem.name.substring(0, 75)}...`
                              : filteredItem.name}
                          </div>
                        </Link>
                      ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          {/* {!isSearch && (
            <> */}
          <div className="loginContainer">
            <Link
              onClick={() => {
                handleLogout()
                resetNavbar()
              }}
              className="link"
              to={`${isLoggedIn ? "/" : "/innlogging"}`}
            >
              {isLoggedIn ? (
                <button className="login-wide" onClick={() => handleLogout}>
                  Logg ut
                </button>
              ) : (
                <button className="login-wide">Logg inn</button>
              )}
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
              {cart.length > 0 && (
                <div className="cartIconCircle">{cart.length}</div>
              )}
            </button>
            {isCart && (
              <div className="cartPreview">
                <h5>Varer i handlevogn:</h5>

                {cart.map((item) => (
                  <div
                    className="previewProductCard"
                    key={item._id + " preview"}
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
                          cart.filter((product) => product._id !== item._id)
                        )
                      }
                      aria-label={`Fjern ${item.name} (id: '${item._id}') fra handlevogn`}
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
            <div className={`line1 ${isBurgerToggle && "line1-toggle"}`}></div>
            <div className={`line2 ${isBurgerToggle && "line2-toggle"}`}></div>
            <div className={`line3 ${isBurgerToggle && "line3-toggle"}`}></div>
          </button>
          {/* </>
          )} */}
        </div>
      </div>
      {isBurgerToggle && <div className="darkScreen"></div>}
    </>
  )
}

export default Navbar
