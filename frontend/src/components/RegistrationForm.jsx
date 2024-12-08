import { useState } from "react"
import axios from "axios"
import "./RegistrationForm.css"

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
      console.log("Registration successful:", response.data)
      setSuccess("Registration successful! You can now log in.")
    } catch (err) {
      console.error(
        "Error during registration:",
        err.response?.data || err.message
      )
      setError(
        err.response?.data?.error || "An error occurred. Please try again."
      )
    }
  }

  return (
    <form onSubmit={handleSubmit} className="registrationForm">
      <div>
        <label>Brukernavn</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
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
      <div>
        <label>Bekreft passord</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="formSubmit">
        <h3>Registrer</h3>
      </button>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </form>
  )
}

export default RegistrationForm
