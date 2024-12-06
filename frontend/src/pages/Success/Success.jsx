import { Link } from "react-router-dom"
import "./Success.css"

function Success() {
  return (
    <div className="successContainer">
      <div className="cartThanksContainer">
        <h1 className="cartThanks">Takk for at du handlet hos oss!</h1>
        <Link to={"/"}>
          <b>&larr; Tilbake til butikk</b>
        </Link>
      </div>
    </div>
  )
}

export default Success
