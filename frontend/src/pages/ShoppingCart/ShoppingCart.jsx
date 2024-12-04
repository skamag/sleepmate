import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import "./ShoppingCart.css"

function ShoppingCart({
  resetNavbar,
  // cartProducts,
  // setCartProducts
}) {
  const [productAmount, setProductAmount] = useState([1, 2, 1])

  const { cart, setCart } = useCart()

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
          {cart.map((product, index) => (
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
