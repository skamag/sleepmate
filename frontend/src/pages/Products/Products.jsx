import products from "../../data/products.json"
import { Link } from "react-router-dom"
import "./Products.css"

function Products({ data, setSelectedProduct }) {
  const handleSelectProduct = (e) => {
    setSelectedProduct(e)
  }

  return (
    <section className="products-section">
      <div className="sidebar">
        <div className="sidebar-search">
          <i className="fa fa-search"></i>
          <input type="text" />
        </div>
        <nav className="categories">
          <h2 className="sidenav-header">Kategorier</h2>
          <ul>
            <li>Lys- og støyreduksjon</li>
            <li>Smart-apparater</li>
            <li>Sengeartikler</li>
          </ul>
        </nav>
        <nav className="brands">
          <h2 className="sidenav-header">Merker</h2>
          <ul>
            <li>SøvnPro+</li>
            <li>Stillhet Lux</li>
            <li>Luksus Svart</li>
            <li>SilentSleep</li>
            <li>NattFred</li>
            <li>Søvnbølge</li>
            <li>SøvnTracker Pro</li>
            <li>Soloppgang Pro</li>
            <li>SøvnEssens</li>
            <li>Arctic Cool Pillow</li>
            <li>Fersk Søvn</li>
            <li>Ro Søvn</li>
            <li>Pustende Komfort</li>
            <li>Dyp Varm Komfort</li>
            <li>SkyForm</li>
          </ul>
        </nav>
        <div className="price-range-container"></div>
      </div>
      <div className="products-main">
        <div className="products-top-text">
          <p>Antall produkter: {products.length}</p>
          <p>
            Sorter etter:{" "}
            <span>
              <select name="" id="" className="sort-select">
                <option value="relevans">Relevans</option>
                <option value="relevans">Alfabetisk</option>
                <option value="relevans">Høyeste pris</option>
                <option value="relevans">Laveste pris</option>
              </select>
            </span>
          </p>
        </div>
        <div className="products-grid">
          {products.map((item) => (
            <Link className="link" to={"/produktside"} key={item.id}>
              <article
                className="product"
                onClick={() => handleSelectProduct(item.id)}
              >
                <div className="image-section">
                  <img src={item.images[0]} alt={item.name} />
                </div>
                <div className="details-section">
                  <div className="details-text">
                    <p>{item.name.split(" - ")[0]}</p>
                    <p>{item.name.split(" - ")[1]}</p>
                  </div>
                  <div className="price-and-add-to-cart">
                    <b>{item.price} kr</b>
                    <button className="add-to-cart-button">
                      <i className="fa-solid fa-cart-plus"></i>
                    </button>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products
