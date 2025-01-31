import "./Contact.css"

function Contact() {
  return <section className="contact-section"><div><h1 className="contact-header">Kontakt</h1><p className="contact-ingress">Send oss gjerne en melding, vi vil forsøke å svare så raskt som mulig.</p></div><main className="contact-main">
    <div className="contact-info">
      <div className="location">
      <h2>Adresse</h2>
      <div><p>Gatenavn 123, Bydel</p>
      <p>1234 Stedsnavn</p>
      </div>
      </div>
      <div className="follow-us">
        <h2>Følg oss</h2>
        <div className="socials-container">
          <button>
          <i className="fa fa-facebook"></i></button>
          <button><i className="fa fa-twitter"></i></button>
          <button><i className="fa fa-instagram"></i></button>
          <button><i className="fa fa-google-plus"></i></button>
        </div>
      </div>
      <p className="copyright">&copy; Opphavsrett 2024</p>
    </div>
    <form action="" className="contact-form">
      <h2>Kontaktskjema</h2>
      <input type="text" placeholder="Fullt navn" />
      <input type="text" placeholder="Epostadresse" />
      <textarea name="" id="" placeholder="Melding"></textarea>
      <input className="submit-button" type="submit" value="Send melding" />
    </form>
  </main></section>
}

export default Contact
