import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home/Home"
import About from "./pages/About/About"
import Contact from "./pages/Contact/Contact"
import Products from "./pages/Products/Products"
import ProductPage from "./pages/ProductPage/ProductPage"
import "./styles/globals.css"

function App() {
  const [selectedProduct, setSelectedProduct] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={<Home setSelectedProduct={setSelectedProduct} />}
            />
            <Route path="/om" element={<About />} />
            <Route path="/produkter" element={<Products />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route
              path="/produktside"
              element={
                <ProductPage
                  selectedProduct={selectedProduct}
                  setSelectedProduct={setSelectedProduct}
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
