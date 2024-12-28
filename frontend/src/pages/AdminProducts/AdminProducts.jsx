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
    <div>
      <h1>Products</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price} (Stock: {product.stock})
            <button onClick={() => handleUpdateProduct()}></button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminProducts
