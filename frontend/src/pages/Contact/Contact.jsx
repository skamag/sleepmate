import "./Contact.css"

function Contact() {
  return <section className="contact-section"><div><h1 className="contact-header">Kontakt</h1><p className="contact-ingress">Send oss gjerne en melding ved å benytte kontaktskjemaet nedenfor, vi vil forsøke å svare så raskt som mulig.</p></div><main className="contact-main">
    <div className="contact-info">
      <div className="location">
        <div className="image-container">
      <img src="/icons8-map-point-100.png" alt="map-point-icon" /></div>
      <h2>Adresse</h2>
      <div><p>Gatenavn 123, Bydel</p>
      <p>1234 Stedsnavn</p>
      </div>
      </div>
      <div className="phone">
      <div className="image-container">
        <img src="/icons8-phone-100.png" alt="phone-icon" />
        </div>
      <h2>Telefon</h2>
      <div><p>123 45 678</p>
      </div>
      </div>
      <div className="mail">
      <div className="image-container">
      <img src="/icons8-email-100.png" alt="email-icon" /></div>
      <h2>Epost</h2>
      <div><p>bedrift@epost.no</p>
      </div>
      </div>
      {/* <div className="follow-us">
        <h2>Følg oss</h2>
        <div className="socials-container">
          <button>
          <i className="fa fa-facebook"></i></button>
          <button><i className="fa fa-instagram"></i></button>
          <button><i className="fa fa-twitter"></i></button>
          <button><i className="fa fa-pinterest"></i></button>
          <button><i className="fa fa-youtube"></i></button>
        </div>
      </div> */}
    </div>
    <form action="" className="contact-form">
      <input type="text" placeholder="Fullt navn" />
      <input type="text" placeholder="Epostadresse" />
      <textarea name="" id="" rows="5" minlength="1" maxlength="250" placeholder="Melding"></textarea>
      <input className="submit-button" type="submit" value="Send melding" />
    </form>
  </main>
  </section>
}

export default Contact
