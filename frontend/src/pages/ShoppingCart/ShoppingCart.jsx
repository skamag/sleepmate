import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./ShoppingCart.css"

function ShoppingCart({ resetNavbar, cartProducts, setCartProducts }) {
  // const testArray = [
  //   {
  //     id: 13,
  //     name: "Bambus sengetøy - Pustende Komfort",
  //     description:
  //       "Mykt og pustende sengetøy laget av bambus for en luksuriøs og temperaturregulerende søvnopplevelse.",
  //     price: 899.0,
  //     currency: "NOK",
  //     category: "Sengeartikler",
  //     "sub-category": "Sengetøy",
  //     stock: 50,
  //     sizes: ["Queen", "King"],
  //     colors: ["beige"],
  //     rating: 4.7,
  //     images: ["./bambus-laken.webp"],
  //     isFeatured: true,
  //   },
  //   {
  //     id: 14,
  //     name: "Varmepute for Rygg - Dyp Varm Komfort",
  //     description:
  //       "Varmepute med flere innstillinger som lindrer spenninger i korsryggen og hjelper deg med å slappe av.",
  //     price: 549.0,
  //     currency: "NOK",
  //     category: "Sengeartikler",
  //     "sub-category": "Varmeputer",
  //     stock: 60,
  //     sizes: ["Standard"],
  //     colors: ["#add8e6"],
  //     rating: 4.6,
  //     images: ["./ryggpute.webp"],
  //     isFeatured: false,
  //   },
  //   {
  //     id: 15,
  //     name: "Memory Foam Pute - SkyForm",
  //     description:
  //       "Ergonomisk designet pute med memory foam som gir optimal støtte til nakken og forbedrer søvnkvaliteten.",
  //     price: 649.0,
  //     currency: "NOK",
  //     category: "Sengeartikler",
  //     "sub-category": "Putetilbehør",
  //     stock: 80,
  //     sizes: ["Standard"],
  //     colors: ["white"],
  //     rating: 4.8,
  //     images: ["./memory-foam--pute.webp"],
  //     isFeatured: true,
  //   },
  // ]

  const [productAmount, setProductAmount] = useState([1, 2, 1])

  return (
    <section className="cartMainSection">
      <h1 className="cartMainHeader">ShoppingCart</h1>
      <div className="shoppingCart">
        <div className="cartList">
          <div className="cartListCategories">
            <p>Test</p>
            <p></p>
            <p className="text-center">Test</p>
            <p className="text-center">Test</p>
            <p className="text-center">Test</p>
          </div>
          {/* {cartProducts.map((product) => ( */}
          {cartProducts.map((product, index) => (
            <div className="cartListRow" key={product.id}>
              {/* {() => addProductAmount()} */}
              <div className="imageContainer">
                <img
                  src={product.images[0]}
                  alt={"Image for " + product.name}
                />
              </div>
              <div className="cartListTextContainer">
                <p className="cartListName">{product.name}</p>
                <p className="cartListAlternatives">
                  Eventuell størrelse og/eller farge
                </p>
              </div>
              <p className="cartListPrice text-center">
                {product.price + " kr"}
              </p>
              <div className="cartListAmount">
                <button>&#x2212;</button>
                <input
                  type="text"
                  value={productAmount[index]}
                  onChange={(e) => setProductAmount([])}
                />
                <button>&#x2b;</button>
              </div>
              <p className="cartListTotal text-center">
                {product.price * productAmount + " kr"}
              </p>
            </div>
          ))}
          <Link
            to="/"
            className="backToShop link"
            onClick={() => {
              window.scroll(top)
              resetNavbar()
            }}
          >
            <b>&larr; Tilbake til butikken</b>
          </Link>
        </div>

        <div className="cartSummary"></div>
      </div>
    </section>
  )
}

export default ShoppingCart
