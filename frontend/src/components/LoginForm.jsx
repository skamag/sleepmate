import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
// import "./LoginForm.css"

function LoginForm({ handleLogin }) {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    console.log("Login formData:", formData)

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        formData
      ) // Adjust the endpoint as needed
      console.log("Login successful:", response.data)
      // Save token to localStorage or context
      localStorage.setItem("authToken", response.data.token)
      navigate("/innlogget")
      handleLogin()
    } catch (err) {
      console.error("Error during login:", err.response?.data || err.message)
      setError(
        err.response?.data?.error || "An error occurred. Please try again."
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="loginForm">
      <div>
        <label>Epost</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Passord</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" disabled={isLoading} className="formSubmit">
        <h3>{isLoading ? "Logging in..." : "Logg inn"}</h3>
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  )
}

export default LoginForm
