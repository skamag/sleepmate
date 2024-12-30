import { useEffect, useState } from "react"
import API from "../../utils/api"
import "./AdminProducts.css"

function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

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
    <div className="adminProducts">
      <h1>Produkter</h1>
      <div className="actions-container">
        <span className="text-input-container">
          <i className="fa fa-search"></i>
          <input type="text" placeholder="Finn produkt..." />
        </span>
        <button className="add-product">Legg til vare</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        <li className="list-header">
          <span className="justify-center">
            <select name="handlinger" id="" value="">
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
        {products.map((product, index) => (
          <li key={product._id} className={`${index % 2 === 0 ? "dark" : ""}`}>
            <span className="justify-center">
              <input type="checkbox" />
            </span>
            <span>{product.name}</span>
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
    </div>
  )
}

export default AdminProducts
