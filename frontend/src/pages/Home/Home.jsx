// import ItemsList from "../../components/ItemsList"
import ProductsGrid from "../../components/ProductsGrid"
import DiscountCategories from "../../components/DiscountCategories"
import "./Home.css"

function Home({ setSelectedProduct }) {
  return (
    <div className="home">
      {/* <ItemsList /> */}

      {/* Forsidebilde/banner */}
      <section className="hero">
        <div className="heroContent">
          <h1 className="heroHeader">Finn din lader.</h1>
          {/* <h1 className="heroHeader">Overskrift.</h1> */}
          <p className="heroParagraph">
            Så du kan ha mer overskudd til det som betyr mest for deg.
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. */}
          </p>
          <button className="heroButton" aria-label="Utforsk produkter">
            Utforsk produkter &rarr;
          </button>
        </div>
      </section>

      {/* Seksjon for populære produkter, nyheter og tilbud */}
      <section className="grids">
        <div className="popular">
          <h1 className="homeGridHeader">Populære produkter</h1>
          <ProductsGrid
            startIndex={0}
            setSelectedProduct={setSelectedProduct}
          />
        </div>
        <div className="newReleases">
          <h1 className="homeGridHeader">Nyheter</h1>
          <DiscountCategories />
        </div>
        <div className="specialOffers">
          <h1 className="homeGridHeader">På tilbud nå</h1>
          <ProductsGrid
            startIndex={4}
            setSelectedProduct={setSelectedProduct}
          />
        </div>
      </section>
    </div>
  )
}

export default Home
