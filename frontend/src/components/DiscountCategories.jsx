import { Link } from "react-router-dom"
import "./DiscountCategories.css"

function DiscountCategories() {
  return (
    <>
      <section className="discountCategories">
        <Link to="/produkter" className="categoryLink link">
          <div className="bedSection">
            <div className="textContainer">
              <h1>Seng</h1>
              <p>
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s
              </p>
              <p>
                <b>Se utvalg &rarr;</b>
              </p>
            </div>
          </div>
        </Link>
        <div className="soundAndElectronicsSection">
          <Link to="/produkter" className="soundSection link">
            <div className="textContainer">
              <h1>Lyddemping</h1>
              <p>
                <b>Se utvalg &rarr;</b>
              </p>
            </div>
          </Link>
          <Link
            to="/produkter"
            className="categoryLink link electronicsSection"
          >
            <div className="textContainer">
              <h1>Elektronikk</h1>
              <p>
                <b>Se utvalg &rarr;</b>
              </p>
            </div>
          </Link>
        </div>
      </section>
    </>
  )
}

export default DiscountCategories
