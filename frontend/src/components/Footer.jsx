import React from "react"
import "./Footer.css"

function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-content">
          <div className="footer-list">
            <h1>Om Oss</h1>
            <p>
              Vi tilbyr høykvalitets søvnprodukter for en bedre natts søvn. Hos
              oss finner du alt du trenger for å sove bedre.
            </p>
          </div>
          <div className="footer-list">
            <h1>Kontakt</h1>
            <ul>
              <li>Gatenavn 123, Bydel</li>
              <li>By- og/eller kommunenavn</li>
              <li>1234 Poststed</li>
              <li>Telefon: +47 123 45 678</li>
              <li>Epost: kontakt@sleepmate.no</li>
            </ul>
          </div>
          <div className="footer-list">
            <h1>Meny</h1>
            <ul>
              <li>Hjem</li>
              <li>Om oss</li>
              <li>Produkter</li>
              <li>Kontakt</li>
            </ul>
          </div>
          <div className="footer-list">
            <h1>Følg oss</h1>
            <ul className="icons-list">
              <li>
                <i className="fa fa-facebook"></i>
              </li>
              <li>
                <i className="fa fa-instagram"></i>
              </li>
              <li>
                <i className="fa fa-twitter"></i>
              </li>
              <li>
                <i className="fa fa-pinterest"></i>
              </li>
              <li>
                <i className="fa fa-youtube"></i>
              </li>
            </ul>
            <div className="register-container">
              <input type="text" placeholder="Din epostadresse" />
              <button>Registrer</button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-footer">
        <p>&copy; 2024 Butikknavn. Alle rettigheter reservert.</p>
      </div>
    </footer>
  )
}

export default Footer
