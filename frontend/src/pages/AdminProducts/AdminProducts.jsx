import { useEffect, useState } from "react"
import API from "../../utils/api"
import "./AdminProducts.css"

function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [searchInput, setSearchInput] = useState("")
  const [showAddProduct, setShowAddProduct] = useState(false)

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    image: "",
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const { data } = await API.get("/items")
        setProducts(data)
      } catch (err) {
        setError("Failed to fetch products.")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setNewProduct((prev) => ({ ...prev, [id]: value }))
  }

  // useEffect(() => {
  //   showAddProduct
  //     ? (document.body.style.overflow = "hidden")
  //     : (document.body.style.overflow = "scroll")
  // }, [showAddProduct])

  const handleAddProduct = async (e) => {
    e.preventDefault()
    try {
      const { data } = await API.post("/items", newProduct) // Send POST request
      setProducts((prev) => [...prev, data]) // Add the new product to the list
      setShowAddProduct(false) // Close the form
      setNewProduct({ name: "", price: "", stock: "", image: "" })
    } catch (err) {
      console.error("Error adding product:", err)
    }
  }

  const handleUpdateProduct = async (id) => {
    try {
      const updatedProduct = { stock: 50 } // Example: Update stock
      const { data } = await API.put(`/items/${id}`, updatedProduct) // PUT /api/items/:id
      setProducts((prev) =>
        prev.map((product) => (product._id === id ? data : product))
      )
    } catch (err) {
      console.error("Error updating product:", err)
    }
  }

  return (
    <div className={`adminProducts ${showAddProduct && "adminProducts-crop"}`}>
      <main>
        <h1>Produkter</h1>
        <div className="actions-container">
          <span className="text-input-container">
            <i className="fa fa-search"></i>
            <input
              type="text"
              placeholder="Finn produkt..."
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </span>
          <span>
            <b>{products.length} produkter</b>
          </span>
          <button
            className="add-product-button"
            onClick={() => setShowAddProduct(true)}
          >
            Legg til vare
          </button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <ul>
          <li className="list-header">
            <span className="justify-center">
              <select name="handlinger" id="">
                <option value="options-title">--</option>
                <option value="option-1">1</option>
                <option value="option-2">2</option>
                <option value="option-3">3</option>
              </select>
            </span>
            <span>Navn</span>
            <span>Pris</span>
            <span>På lager</span>
            <span></span>
          </li>
          {products
            .filter((product) =>
              product.name.toLowerCase().includes(searchInput.toLowerCase())
            )
            .map((product, index) => (
              <li
                key={product._id}
                className={`${index % 2 === 0 ? "dark" : ""}`}
              >
                <span className="justify-center">
                  <input type="checkbox" />
                </span>
                <span>
                  <img className="list-image" src={product.images[0]} alt="" />
                  {product.name}
                </span>
                <span>{product.price} kr</span>
                <span>{product.stock}</span>
                <span className="justify-center">
                  <button
                    className="edit-button"
                    onClick={() => handleUpdateProduct()}
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                </span>
              </li>
            ))}
        </ul>
      </main>
      {showAddProduct && (
        <section className="add-product-section">
          <div className="add-product">
            <div className="header">
              <span>Nytt produkt</span>
              <button
                className="x-button"
                onClick={() => setShowAddProduct(false)}
              >
                &#10005;
              </button>
            </div>
            <form onSubmit={handleAddProduct}>
              <div>
                <label htmlFor="image">Bilde</label>
                <input
                  type="text"
                  id="image"
                  placeholder="Skriv bildets URL"
                  value={newProduct.image}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="name">Produktnavn</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Skriv navn"
                  value={newProduct.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="price">Pris</label>
                <input
                  type="number"
                  id="price"
                  placeholder="Skriv pris"
                  value={newProduct.price}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="stock">Antall på lager</label>
                <input
                  type="number"
                  id="stock"
                  placeholder="Skriv antall"
                  value={newProduct.stock}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="submit-button">
                Legg til produkt
              </button>
            </form>
          </div>
        </section>
      )}
    </div>
  )
}

export default AdminProducts
