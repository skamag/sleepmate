// import aboutImage from '/about-morning.jpg'
import "./About.css"

function About() {
  return (
    <section className="about-container">
      <div className={"section"}>
        <h1 className={"heading"}>Om oss</h1>
        <p className={"heading-text"}>
          Velkommen til Butikknavn – din destinasjon for søvnrelaterte produkter
          av høy kvalitet. Vi er dedikerte til å hjelpe deg med å få en bedre
          natts søvn ved å tilby produkter som er nøye utvalgt for komfort,
          funksjonalitet og innovasjon.
        </p>
      </div>
      <div className={"about-main"}>
      <div className={"text-sections"}>
      

      <div className={"section"}>
        <h2 className={"subheading"}>Vår Historie</h2>
        <p className={"text"}>
          Butikknavn startet med en enkel idé: å forbedre hverdagen ved å gi
          mennesker den beste søvnen de kan få. Etter å ha opplevd søvnproblemer
          selv, ønsket vi å skape et sted hvor folk kan finne alt de trenger for
          en avslappende natt. Siden oppstarten har vi jobbet hardt for å tilby
          produkter som virkelig utgjør en forskjell.
        </p>
      </div>

      <div className={"section"}>
        <h2 className={"subheading"}>Våre Verdier</h2>
        <ul className={"list"}>
          <li className={"listItem"}>
            Vi jobber kun med pålitelige leverandører for å sikre at våre
            produkter holder høyeste standard.
          </li>
          <li className={"listItem"}>
            Vi streber etter å tilby miljøvennlige alternativer og reduserer vår
            påvirkning på planeten.
          </li>
          <li className={"listItem"}>
            Ditt velvære er vår prioritet, og vi er her for å hjelpe deg hvert
            steg på veien.
          </li>
        </ul>
      </div>

      <div className={"section"}>
        <h2 className={"subheading"}>Vårt Mål</h2>
        <p className={"text"}>
          Vi ønsker å bli Norges mest pålitelige nettbutikk for søvnprodukter.
          Gjennom å tilby innovative løsninger og eksepsjonell kundeservice,
          ønsker vi å forbedre søvnen til alle våre kunder.
        </p>
      </div></div>
      <div className="about-image-container">
  {/* <img src={aboutImage} alt="" /> */}
</div></div>
    </section>
  )
}

export default About
