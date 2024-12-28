import { Outlet, useLocation } from "react-router-dom"
import Navbar from "./Navbar"
import AdminNavbar from "./AdminNavbar"
import "./Layout.css"
import { useState } from "react"

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
  const isAdminLogin = location.pathname === "/admin"

  const [isAdmin, setIsAdmin] = useState(true)

  return (
    <div className="layout">
      {/* Navbar */}
      {!(isLoginPage || isAdminLogin || isAdmin) && (
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
      {!isAdmin && (
        <main>
          <Outlet />
        </main>
      )}

      {/* Footer */}
      {!(isLoginPage || isAdminLogin || isAdmin) && (
        <footer>
          <p>&copy; 2024 Butikknavn.</p>
        </footer>
      )}

      {isAdmin && (
        <>
          <AdminNavbar>
            <main>
              <Outlet />
            </main>
          </AdminNavbar>
        </>
      )}
    </div>
  )
}

export default Layout
