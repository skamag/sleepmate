import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import axios from "axios"
import { CartProvider, useCart } from "./context/CartContext"
import Layout from "./components/Layout"
import Home from "./pages/Home/Home"
import About from "./pages/About/About"
import Contact from "./pages/Contact/Contact"
import Products from "./pages/Products/Products"
import ProductPage from "./pages/ProductPage/ProductPage"
import LoginPage from "./pages/LoginPage/LoginPage"
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart"
import Success from "./pages/Success/Success"
import Innlogget from "./pages/Innlogget/Innlogget"
import "./styles/globals.css"

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const [selectedProduct, setSelectedProduct] = useState(0)
  // const [cartProducts, setCartProducts] = useState([])

  const [isSearch, setIsSearch] = useState(false)
  const [isCart, setIsCart] = useState(false)
  const [isBurgerToggle, setIsBurgerToggle] = useState(false)

  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/items")
        setData(response.data)
        // console.log(response.data)
        // console.log(selectedProduct)
        // console.log(selectedItemIndex)
        // setLoading(false)
      } catch (error) {
        console.error("Error fetching items:", error)
        // setLoading(false)
      }
      // window.scroll(top)
    }

    fetchItems()
  }, [])

  const resetNavbar = () => {
    setIsSearch(false)
    setIsCart(false)
    setIsBurgerToggle(false)
    setSearchText("")
  }

  return (
    <CartProvider>
      <Router>
        <Routes>
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
              />
            }
          >
            <Route
              index
              element={<Home setSelectedProduct={setSelectedProduct} />}
            />
            <Route path="/om" element={<About />} />
            <Route path="/produkter" element={<Products />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/innlogging" element={<LoginPage />} />
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
            <Route path="/innlogget" element={<Innlogget />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App
