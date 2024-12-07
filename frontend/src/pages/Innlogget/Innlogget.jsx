import { Link } from "react-router-dom"
import "./Innlogget.css"

function Innlogget() {
  return (
    <div className="innloggetContainer">
      <div className="cartThanksContainer">
        <h1 className="cartThanks">Innlogging vellykket!</h1>
        <Link to={"/"}>
          <b>&larr; Tilbake til butikk</b>
        </Link>
      </div>
    </div>
  )
}

export default Innlogget
