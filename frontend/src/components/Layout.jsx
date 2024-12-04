import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import "./Layout.css"

function Layout({
  data,
  setSelectedProduct,
  resetNavbar,
  cartProducts,
  setCartProducts,
}) {
  return (
    <div className="layout">
      {/* Navbar */}
      <Navbar
        data={data}
        setSelectedProduct={setSelectedProduct}
        resetNavbar={resetNavbar}
        cartProducts={cartProducts}
        setCartProducts={setCartProducts}
      />

      {/* Main */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Layout
