import { useEffect, useState } from "react"
import API from "../../utils/api"
import "./AdminUsers.css"

function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

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

  return (
    <div className="adminUsers">
      <h1>Brukere</h1>

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
    </div>
  )
}

export default AdminUsers
