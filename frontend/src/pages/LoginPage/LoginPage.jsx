import { useState } from "react"
import LoginForm from "../../components/LoginForm"
import RegistrationForm from "../../components/RegistrationForm"
import "./LoginPage.css"

function LoginPage({ handleLogin }) {
  const [showRegistration, setShowRegistration] = useState(false)

  return (
    <div className="loginPage">
      <div className="login">
        <h1>{showRegistration ? "Registrer bruker" : "Logg inn"}</h1>

        {showRegistration ? (
          <RegistrationForm />
        ) : (
          <LoginForm handleLogin={handleLogin} />
        )}
        <div className="toggle-form">
          {showRegistration ? (
            <p>
              Har du allerede bruker?{" "}
              <button
                onClick={() => {
                  setShowRegistration((prev) => !prev)
                  window.scrollTo(0, 0)
                }}
              >
                <u>Logg inn</u>
              </button>
            </p>
          ) : (
            <p>
              Har du ikke bruker?{" "}
              <button onClick={() => setShowRegistration((prev) => !prev)}>
                <u>Registrer deg</u>
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginPage
