import { useEffect, useState } from "react"
import API from "../../utils/api"
import "./AdminUsers.css"

function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [showAddUser, setShowAddUser] = useState(false)
  const [showUpdateUser, setShowUpdateUser] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const { data } = await API.get("/users")
        setUsers(data)
      } catch (err) {
        setError("Failed to fetch users.")
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  // const handleAddProduct = async (e) => {
  //   e.preventDefault()

  //   if (newProduct.name && newProduct.price && newProduct.stock) {
  //     try {
  //       const { data } = await API.post("/items", newProduct) // Send POST request
  //       setProducts((prev) => [...prev, data]) // Add the new product to the list
  //       setShowAddProduct(false) // Close the form
  //       setNewProduct({ name: "", price: "", stock: "", image: "" })
  //     } catch (err) {
  //       console.error("Error adding product:", err)
  //     }
  //   } else {
  //     alert(
  //       "Alle obligatoriske felter (navn, pris og lagerstatus) må fylles ut."
  //     )
  //   }
  // }

  // const handleUpdateProduct = async (id) => {
  //   console.log("Updating product:", id, updateProduct)
  //   try {
  //     const { data } = await API.put(`/items/${id}`, updateProduct) // PUT /api/items/:id
  //     setProducts((prev) =>
  //       prev.map((product) => (product._id === id ? data : product))
  //     )
  //     setShowUpdateProduct(false)
  //   } catch (err) {
  //     console.error("Error updating product:", err)
  //   }
  // }

  // const handleDeleteProduct = async (id) => {
  //   const confirmDelete = window.confirm(
  //     "Er du sikker på at du vil slette produktet?"
  //   )
  //   if (confirmDelete) {
  //     try {
  //       await API.delete(`/items/${id}`) // Send DELETE request
  //       setProducts((prev) => prev.filter((product) => product._id !== id)) // Remove the product from the list
  //       setShowUpdateProduct(false)
  //     } catch (err) {
  //       console.error("Error deleting product:", err)
  //       alert("Kunne ikke slette produktet. Prøv igjen senere.")
  //     }
  //   }
  // }

  return (
    <div className="adminUsers">
      <main>
        <h1>Brukere</h1>
        <div className="actions-container">
          <span className="text-input-container">
            <i className="fa fa-search"></i>
            <input
              type="text"
              placeholder="Finn bruker..."
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </span>
          <span>
            <b>{users.length} brukere</b>
          </span>
          <button
            className="add-user-button"
            onClick={() => setShowAddUser(true)}
          >
            Legg til bruker
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
            <span>Brukernavn</span>
            <span>Epost</span>
            <span>Rolle</span>
            <span></span>
          </li>
          {users.map((user, index) => (
            <li key={user._id} className={`${index % 2 === 0 ? "dark" : ""}`}>
              <span className="justify-center">
                <input type="checkbox" />
              </span>
              <span>{user.username}</span>
              <span>{user.email}</span>
              <span>{user.role}</span>
              <span className="justify-center">
                <button
                  className="edit-button"
                  onClick={() => handleUpdateUser()}
                >
                  <i className="fa fa-edit"></i>
                </button>
              </span>
            </li>
          ))}
        </ul>
      </main>
      {showAddUser && (
        <section className="add-user-section">
          <div className="add-user">
            <div className="header">
              <span>Nytt produkt</span>
              <button
                className="x-button"
                onClick={() => setShowAddUser(false)}
              >
                &#10005;
              </button>
            </div>
            <form onSubmit={handleAddUser}>
              <div>
                <label htmlFor="image">Bilde</label>
                <input
                  type="text"
                  id="image"
                  placeholder="Skriv bildets URL"
                  value={newUser.image}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="name">Produktnavn</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Skriv navn"
                  value={newUser.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="price">Pris</label>
                <input
                  type="number"
                  id="price"
                  placeholder="Skriv pris"
                  value={newUser.price}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="stock">Antall på lager</label>
                <input
                  type="number"
                  id="stock"
                  placeholder="Skriv antall"
                  value={newUser.stock}
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
      {showUpdateUser && (
        <section className="update-user-section">
          {users
            .filter((user) => user._id === updateUserId)
            .map((filteredUser) => (
              <div className="update-user" key={filteredUser._id}>
                <div className="header">
                  <div className="header-text">
                    <h1>Oppdater produkt</h1>
                    <p>ID: {filteredUser._id}</p>
                  </div>
                  <button
                    className="x-button"
                    onClick={() => setShowUpdateUser(false)}
                  >
                    &#10005;
                  </button>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleUpdateUser(updateUser._id)
                  }}
                >
                  <div>
                    <label htmlFor="image">Bilde(r)</label>
                    <input
                      type="text"
                      id="image"
                      placeholder={
                        filteredUser.images.length === 0
                          ? "Ingen bilder"
                          : filteredUser.images.length > 1
                          ? filteredUser.images[0] + "..."
                          : filteredUser.images[0]
                      }
                      // value={newUser.image}
                      // onChange={handleInputChange}
                      onChange={(e) => {
                        const { id, value } = e.target
                        setUpdateUser((prev) => ({ ...prev, [id]: value }))
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="name">Produktnavn</label>
                    <input
                      type="text"
                      id="name"
                      placeholder={filteredUser.name}
                      // value={newUser.name}
                      // onChange={handleInputChange}
                      onChange={(e) => {
                        const { id, value } = e.target
                        setUpdateUser((prev) => ({ ...prev, [id]: value }))
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="price">Pris</label>
                    <input
                      type="number"
                      id="price"
                      placeholder={filteredUser.price}
                      // value={newUser.price}
                      // onChange={handleInputChange}
                      onChange={(e) => {
                        const { id, value } = e.target
                        setUpdateUser((prev) => ({ ...prev, [id]: value }))
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="stock">Antall på lager</label>
                    <input
                      type="number"
                      id="stock"
                      placeholder={filteredUser.stock}
                      // value={newUser.stock}
                      // onChange={handleInputChange}
                      onChange={(e) => {
                        const { id, value } = e.target
                        setUpdateUser((prev) => ({ ...prev, [id]: value }))
                      }}
                    />
                  </div>
                  <div className="buttons-container">
                    <button type="submit" className="submit-button">
                      Oppdater bruker
                    </button>
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => handleDeleteUser(filteredUser._id)}
                    >
                      Slett bruker
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

export default AdminUsers
