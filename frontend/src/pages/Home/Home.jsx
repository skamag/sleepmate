// import ItemsList from "../../components/ItemsList"
import "./Home.css"

function Home() {
  return (
    <div className="home">
      {/* <ItemsList /> */}

      {/* <div>Home</div> */}
      <section className="hero">
        <div className="heroContent">
          <h1 className="heroHeader">Overskrift</h1>
          <p className="heroParagraph">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <button className="heroButton">Utforsk produkter &rarr;</button>
        </div>
      </section>
      <section className="grids">
        <div className="popular"></div>
        <div className="newReleases"></div>
        <div className="specialOffers"></div>
      </section>
    </div>
  )
}

export default Home
