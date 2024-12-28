import LoginForm from "../../components/LoginForm"

function AdminLogin(
  {
    /* handleLogin */
  }
) {
  return (
    <div className="loginPage">
      AdminLogin
      <div className="login">
        <h1>Logg inn</h1>
        <LoginForm
        //   handleLogin={handleLogin}
        />
      </div>
    </div>
  )
}

export default AdminLogin
