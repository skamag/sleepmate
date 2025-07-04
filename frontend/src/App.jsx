import { useEffect, useState } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import API from "./utils/api"
import axios from "axios"
import { CartProvider, useCart } from "./context/CartContext"
import Layout from "./components/Layout"
import WakeUp from "./pages/WakeUp/WakeUp"
import Home from "./pages/Home/Home"
import About from "./pages/About/About"
import Contact from "./pages/Contact/Contact"
import Products from "./pages/Products/Products"
import ProductPage from "./pages/ProductPage/ProductPage"
import LoginPage from "./pages/LoginPage/LoginPage"
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart"
import Success from "./pages/Success/Success"
import PaymentPage from "./pages/PaymentPage/PaymentPage"
import Innlogget from "./pages/Innlogget/Innlogget"
import AdminLogin from "./pages/AdminLogin/AdminLogin"
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard"
import AdminProducts from "./pages/AdminProducts/AdminProducts"
import AdminOrders from "./pages/AdminOrders/AdminOrders"
import AdminUsers from "./pages/AdminUsers/AdminUsers"
import "./styles/globals.css"

function App() {
  const [data, setData] = useState([])
  const [isAsleep, setIsAsleep] = useState(true)
  const [loading, setLoading] = useState(true)

  const [selectedProduct, setSelectedProduct] = useState(0)
  // const [cartProducts, setCartProducts] = useState([])

  const [isSearch, setIsSearch] = useState(false)
  const [isCart, setIsCart] = useState(false)
  const [isBurgerToggle, setIsBurgerToggle] = useState(false)

  const [searchText, setSearchText] = useState("")

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("authToken")
  )

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await API.get("/items")
        setData(response.data)
        // console.log(response.data)
        // console.log(selectedProduct)
        // console.log(selectedItemIndex)
        // setLoading(false)

        const token = localStorage.getItem("authToken")
        if (token) {
          setIsLoggedIn(true)
        }
        // console.log(token, isLoggedIn)
      } catch (error) {
        console.error("Error fetching items:", error)
        // setLoading(false)
      }
      // window.scroll(top)
    }

    fetchItems()

    console.log(data)
  }, [])
  // }, [isLoggedIn])

  const resetNavbar = () => {
    setIsSearch(false)
    setIsCart(false)
    setIsBurgerToggle(false)
    setSearchText("")
  }

  const handleLogin = () => {
    const token = localStorage.getItem("authToken")
    if (token) {
      setIsLoggedIn(true)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    setIsLoggedIn(false)
  }

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route
            path="/oppvaakning"
            element={<WakeUp data={data} setIsAsleep={setIsAsleep} />}
          />

          {data.length === 0 ? (
            <Route path="/" element={<Navigate to="/oppvaakning" replace />} />
          ) : (
            <Route
              path="/"
              element={
                <Layout
                  data={data}
                  resetNavbar={resetNavbar}
                  setSelectedProduct={setSelectedProduct}
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
              }
            >
              <Route
                index
                element={<Home setSelectedProduct={setSelectedProduct} />}
              />
              <Route path="/om" element={<About />} />
              <Route
                path="/produkter"
                element={
                  <Products
                    data={data}
                    setSelectedProduct={setSelectedProduct}
                  />
                }
              />
              <Route path="/kontakt" element={<Contact />} />
              <Route
                path="/innlogging"
                element={<LoginPage handleLogin={handleLogin} />}
              />
              <Route
                path="/handlevogn"
                element={
                  <ShoppingCart
                    resetNavbar={resetNavbar}
                    // cartProducts={cartProducts}
                    // setCartProducts={setCartProducts}
                  />
                }
              />
              <Route
                path="/produktside"
                element={
                  <ProductPage
                    data={data}
                    resetNavbar={resetNavbar}
                    selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                    // cartProducts={cartProducts}
                    // setCartProducts={setCartProducts}
                  />
                }
              />
              <Route path="/suksess" element={<Success />} />
              <Route path="/betaling" element={<PaymentPage />} />
              <Route path="/innlogget" element={<Innlogget />} />

              {/* Admin */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route
                path="/admin-instrumentpanel"
                element={<AdminDashboard />}
              />
              <Route path="/admin-katalog" element={<AdminProducts />} />
              <Route path="/admin-salg" element={<AdminOrders />} />
              <Route path="/admin-brukere" element={<AdminUsers />} />

              {/* <Route path="*" element={<NotFound />} /> */}
            </Route>
          )}
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App
