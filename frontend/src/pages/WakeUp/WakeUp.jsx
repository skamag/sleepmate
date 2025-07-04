import { Link } from "react-router-dom"
import SleepyDino from "../../../public/sleepyDinoTransparent.png"
import "./WakeUp.css"

function WakeUp() {
  return (
    <div className="wakeUpContainer">
      <div className="wakeUpText">
        <h1 className="wakeUpHeader">Nettsiden våkner opp</h1>
        <div className="wakeUpImageContainer">
          <img src={SleepyDino} alt="" />
        </div>
        <b>
          For å redusere strømforbruk kjøles nettsiden ned ved inaktivitet, det
          kan derfor ta litt tid å laste inn siden.
        </b>
      </div>
    </div>
  )
}

export default WakeUp
