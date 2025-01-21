import React from "react"
import "./Footer.css"

function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-content">
          <div>
            <h1>Kontakt</h1>
            <ul>
              <li>Gatenavn 123 Bydel</li>
              <li>Bynavn</li>
              <li>Kommune og fylke</li>
              <li>Postnummer</li>
              <li>Telefonnummer</li>
              <li>Epostadresse</li>
            </ul>
          </div>
          <div>
            <h1>Meny</h1>
            <ul>
              <li>Hjem</li>
              <li>Om oss</li>
              <li>Produkter</li>
              <li>Kontakt</li>
            </ul>
          </div>
          <div>
            <h1>Siste innlegg</h1>
            <ul>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
            </ul>
          </div>
          <div>
            <h1>Overskrift</h1>
            <ul>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
            </ul>
          </div>
        </div>
        <div></div>
      </div>
      <div className="footer-footer">
        <p>&copy; 2024 Butikknavn.</p>
      </div>
    </footer>
  )
}

export default Footer
