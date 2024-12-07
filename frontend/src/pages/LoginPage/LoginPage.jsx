import { useState } from "react"
import LoginForm from "../../components/LoginForm"
import RegistrationForm from "../../components/RegistrationForm"
import "./LoginPage.css"

function LoginPage() {
  const [showRegistration, setShowRegistration] = useState(false)

  return (
    <div className="loginPage">
      <h1>{showRegistration ? "Register" : "Login"}</h1>
      {showRegistration ? <RegistrationForm /> : <LoginForm />}
      <button
        onClick={() => setShowRegistration((prev) => !prev)}
        className="toggle-form"
      >
        {showRegistration ? "Switch to Login" : "Switch to Register"}
      </button>
    </div>
  )
}

export default LoginPage
