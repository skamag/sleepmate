import { Outlet, useLocation } from "react-router-dom"
import Navbar from "./Navbar"
import "./Layout.css"

function Layout({
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
  const location = useLocation()

  const isLoginPage = location.pathname === "/innlogging"

  return (
    <div className="layout">
      {/* Navbar */}
      {!isLoginPage && (
        <Navbar
          data={data}
          setSelectedProduct={setSelectedProduct}
          resetNavbar={resetNavbar}
          isSearch={isSearch}
          setIsSearch={setIsSearch}
          isCart={isCart}
          setIsCart={setIsCart}
          isBurgerToggle={isBurgerToggle}
          setIsBurgerToggle={setIsBurgerToggle}
          searchText={searchText}
          setSearchText={setSearchText}
          // cartProducts={cartProducts}
          // setCartProducts={setCartProducts}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
        />
      )}

      {/* Main */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      {!isLoginPage && (
        <footer>
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </footer>
      )}
    </div>
  )
}

export default Layout
