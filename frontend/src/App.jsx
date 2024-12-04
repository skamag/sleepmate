import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import axios from "axios"
import Layout from "./components/Layout"
import Home from "./pages/Home/Home"
import About from "./pages/About/About"
import Contact from "./pages/Contact/Contact"
import Products from "./pages/Products/Products"
import ProductPage from "./pages/ProductPage/ProductPage"
import "./styles/globals.css"
import LoginPage from "./pages/LoginPage/LoginPage"
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart"

function App() {
  const [data, setData] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(0)
  const [cartProducts, setCartProducts] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/items")
        setData(response.data)
        // console.log(response.data)
        // console.log(selectedProduct)
        // console.log(selectedItemIndex)
        // setLoading(false)
        console.log(cartProducts)
      } catch (error) {
        console.error("Error fetching items:", error)
        // setLoading(false)
      }
      // window.scroll(top)
    }

    fetchItems()
  }, [cartProducts])

  const resetNavbar = () => {
    setIsSearch(false)
    setIsCart(false)
    setIsBurgerToggle(false)
    setSearchText("")
  }

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                data={data}
                resetNavbar={resetNavbar}
                setSelectedProduct={setSelectedProduct}
                cartProducts={cartProducts}
                setCartProducts={setCartProducts}
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
                  cartProducts={cartProducts}
                  setCartProducts={setCartProducts}
                />
              }
            />
            <Route
              path="/produktside"
              element={
                <ProductPage
                  selectedProduct={selectedProduct}
                  setSelectedProduct={setSelectedProduct}
                  cartProducts={cartProducts}
                  setCartProducts={setCartProducts}
                />
              }
            />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
