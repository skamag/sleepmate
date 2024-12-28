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
    <div>
      <h1>Users</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.username} - {user.email} (Role: {user.role})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminUsers
