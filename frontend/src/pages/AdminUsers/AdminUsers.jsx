import { useEffect, useState } from "react"
import API from "../../utils/api"
import "./AdminUsers.css"

function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [searchInput, setSearchInput] = useState("")
  const [showAddUser, setShowAddUser] = useState(false)
  const [showUpdateUser, setShowUpdateUser] = useState(true)
  const [updateUser, setUpdateUser] = useState(null)
  const [updateUserId, setUpdateUserId] = useState(null)

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "",
    password: "",
  })

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

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setNewUser((prev) => ({ ...prev, [id]: value }))
    console.log(newUser)
  }

  const handleAddUser = async (e) => {
    e.preventDefault()

    if (newUser.username && newUser.email && newUser.role) {
      try {
        const { data } = await API.post("/users", newUser) // Send POST request
        setUsers((prev) => [...prev, data]) // Add the new user to the list
        setShowAddUser(false) // Close the form
        setNewUser({ username: "", email: "", role: "", password: "" })
        alert("Ny bruker opprettet!")
      } catch (err) {
        console.error("Error adding user:", err)
      }
    } else {
      alert(
        "Alle obligatoriske felter (navn, epost, rolle og passord) må fylles ut."
      )
    }
  }

  const handleUpdateUser = async (id) => {
    console.log("Updating user:", id, updateUser)
    try {
      const { data } = await API.put(`/users/${id}`, updateUser) // PUT /api/users/:id
      setUsers((prev) => prev.map((user) => (user._id === id ? data : user)))
      setShowUpdateUser(false)
    } catch (err) {
      console.error("Error updating user:", err)
    }
  }

  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Er du sikker på at du vil slette brukeren?"
    )
    if (confirmDelete) {
      try {
        await API.delete(`/users/${id}`) // Send DELETE request
        setUsers((prev) => prev.filter((user) => user._id !== id)) // Remove the user from the list
        setShowUpdateUser(false)
      } catch (err) {
        console.error("Error deleting user:", err)
        alert("Kunne ikke slette brukeren. Prøv igjen senere.")
      }
    }
  }

  return (
    <div className="adminUsers">
      <main>
        <h1>Brukere</h1>
        <div className="actions-container">
          <span className="text-input-container">
            <i className="fa fa-search"></i>
            <input
              type="text"
              value={searchInput}
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
            <span>Passord</span>
          </li>
          {users.map((user, index) => (
            <li key={user._id} className={`${index % 2 === 0 ? "dark" : ""}`}>
              <span className="justify-center">
                <input type="checkbox" />
              </span>
              <span>{user.username}</span>
              <span>{user.email}</span>
              <span>{user.role}</span>
              <span>{user.password.slice(0, 3) + "..."}</span>
              <span className="justify-center">
                <button
                  className="edit-button"
                  onClick={() => {
                    setShowUpdateUser(true)
                    setUpdateUserId(user._id)
                    setUpdateUser(
                      users.find((foundUser) => user.id === foundUser.id)
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
      {showAddUser && (
        <section className="add-user-section">
          <div className="add-user">
            <div className="header">
              <span>Ny bruker</span>
              <button
                className="x-button"
                onClick={() => setShowAddUser(false)}
              >
                &#10005;
              </button>
            </div>
            <form onSubmit={handleAddUser}>
              <div>
                <label htmlFor="username">Brukernavn</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Skriv navn"
                  value={newUser.username}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="email">Epost</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Skriv epost"
                  value={newUser.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="role">Rolle</label>
                <input
                  type="text"
                  id="role"
                  placeholder="Skriv rolle"
                  value={newUser.role}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="password">Passord</label>
                <input
                  type="text"
                  id="password"
                  placeholder="Skriv passord"
                  value={newUser.password}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="submit-button">
                Legg til bruker
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
                    <h1>Oppdater bruker</h1>
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
                  {/* <div>
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
                  </div> */}
                  <div>
                    <label htmlFor="username">Brukernavn</label>
                    <input
                      type="text"
                      id="username"
                      placeholder={filteredUser.userusername}
                      // value={newUser.username}
                      // onChange={handleInputChange}
                      onChange={(e) => {
                        const { id, value } = e.target
                        setUpdateUser((prev) => ({ ...prev, [id]: value }))
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="price">Epost</label>
                    <input
                      type="email"
                      id="email"
                      placeholder={filteredUser.email}
                      // value={newUser.price}
                      // onChange={handleInputChange}
                      onChange={(e) => {
                        const { id, value } = e.target
                        setUpdateUser((prev) => ({ ...prev, [id]: value }))
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="stock">Role</label>
                    <input
                      type="text"
                      id="role"
                      placeholder={filteredUser.role}
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
