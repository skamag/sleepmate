import { useEffect, useState } from "react"
import API from "../../utils/api"
import "./AdminProducts.css"

function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [searchInput, setSearchInput] = useState("")
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [showUpdateProduct, setShowUpdateProduct] = useState(false)
  const [updateProduct, setUpdateProduct] = useState(null)
  const [updateProductId, setUpdateProductId] = useState(null)

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

  // useEffect(() => {
  //   console.log(updateProductId)
  // }, [updateProduct])

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

    if (newProduct.name && newProduct.price && newProduct.stock) {
      try {
        const { data } = await API.post("/items", newProduct) // Send POST request
        setProducts((prev) => [...prev, data]) // Add the new product to the list
        setShowAddProduct(false) // Close the form
        setNewProduct({ name: "", price: "", stock: "", image: "" })
      } catch (err) {
        console.error("Error adding product:", err)
      }
    } else {
      alert(
        "Alle obligatoriske felter (navn, pris og lagerstatus) må fylles ut."
      )
    }
  }

  const handleUpdateProduct = async (id) => {
    console.log("Updating product:", id, updateProduct)
    try {
      const { data } = await API.put(`/items/${id}`, updateProduct) // PUT /api/items/:id
      setProducts((prev) =>
        prev.map((product) => (product._id === id ? data : product))
      )
      setShowUpdateProduct(false)
    } catch (err) {
      console.error("Error updating product:", err)
    }
  }

  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Er du sikker på at du vil slette produktet?"
    )
    if (confirmDelete) {
      try {
        await API.delete(`/items/${id}`) // Send DELETE request
        setProducts((prev) => prev.filter((product) => product._id !== id)) // Remove the product from the list
        setShowUpdateProduct(false)
      } catch (err) {
        console.error("Error deleting product:", err)
        alert("Kunne ikke slette produktet. Prøv igjen senere.")
      }
    }
  }

  return (
    <div
      className={`adminProducts ${
        (showAddProduct || showUpdateProduct) && "adminProducts-crop"
      }`}
    >
      <main>
        <h1>Produkter</h1>
        <div className="actions-container">
          <span className="text-input-container">
            <i className="fa fa-search"></i>
            <input
              type="text"
              value={searchInput}
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
                  {product.id}
                  <button
                    className="edit-button"
                    onClick={() => {
                      setShowUpdateProduct(true)
                      setUpdateProductId(product._id)
                      setUpdateProduct(
                        products.find((item) => product.id === item.id)
                      )
                    }}
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
      {showUpdateProduct && (
        <section className="update-product-section">
          {products
            .filter((product) => product._id === updateProductId)
            .map((filteredProduct) => (
              <div className="update-product" key={filteredProduct._id}>
                <div className="header">
                  <div className="header-text">
                    <h1>Oppdater produkt</h1>
                    <p>ID: {filteredProduct._id}</p>
                  </div>
                  <button
                    className="x-button"
                    onClick={() => setShowUpdateProduct(false)}
                  >
                    &#10005;
                  </button>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleUpdateProduct(updateProduct._id)
                  }}
                >
                  <div>
                    <label htmlFor="image">Bilde(r)</label>
                    <input
                      type="text"
                      id="image"
                      placeholder={
                        filteredProduct.images.length === 0
                          ? "Ingen bilder"
                          : filteredProduct.images.length > 1
                          ? filteredProduct.images[0] + "..."
                          : filteredProduct.images[0]
                      }
                      // value={newProduct.image}
                      // onChange={handleInputChange}
                      onChange={(e) => {
                        const { id, value } = e.target
                        setUpdateProduct((prev) => ({ ...prev, [id]: value }))
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="name">Produktnavn</label>
                    <input
                      type="text"
                      id="name"
                      placeholder={filteredProduct.name}
                      // value={newProduct.name}
                      // onChange={handleInputChange}
                      onChange={(e) => {
                        const { id, value } = e.target
                        setUpdateProduct((prev) => ({ ...prev, [id]: value }))
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="price">Pris</label>
                    <input
                      type="number"
                      id="price"
                      placeholder={filteredProduct.price}
                      // value={newProduct.price}
                      // onChange={handleInputChange}
                      onChange={(e) => {
                        const { id, value } = e.target
                        setUpdateProduct((prev) => ({ ...prev, [id]: value }))
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="stock">Antall på lager</label>
                    <input
                      type="number"
                      id="stock"
                      placeholder={filteredProduct.stock}
                      // value={newProduct.stock}
                      // onChange={handleInputChange}
                      onChange={(e) => {
                        const { id, value } = e.target
                        setUpdateProduct((prev) => ({ ...prev, [id]: value }))
                      }}
                    />
                  </div>
                  <div className="buttons-container">
                    <button type="submit" className="submit-button">
                      Oppdater produkt
                    </button>
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => handleDeleteProduct(filteredProduct._id)}
                    >
                      Slett produkt
                    </button>
                  </div>
                </form>
              </div>
            ))}
        </section>
      )}
    </div>
  )
}

export default AdminProducts
