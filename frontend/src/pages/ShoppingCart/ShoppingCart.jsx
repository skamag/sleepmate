import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import "./ShoppingCart.css"

function ShoppingCart({
  resetNavbar,
  // cartProducts,
  // setCartProducts
}) {
  const [productAmount, setProductAmount] = useState([])
  const shipping = 79
  const rabatt = 0

  const { cart, setCart } = useCart()

  useEffect(() => {
    if (cart.length > 0) {
      setProductAmount(new Array(cart.length).fill(1))
    }
  }, [cart])

  const totalProductsPrice = cart.reduce((total, product, index) => {
    return total + product.price * (productAmount[index] || 1)
  }, 0)

  const handleAmountChange = (index, value) => {
    const updatedAmounts = [...productAmount]
    const newValue = Math.max(1, parseInt(value) || 1) // Minimum value is 1
    updatedAmounts[index] = newValue
    setProductAmount(updatedAmounts)
  }

  return (
    <section className="cartMainSection">
      <h1 className="cartMainHeader">ShoppingCart</h1>
      <div className="shoppingCart">
        <div className="cartList">
          <div className="cartListCategories">
            <p>Produkt</p>
            <p></p>
            <p className="text-center">Pris</p>
            <p className="text-center">Antall</p>
            <p className="text-center">Sum</p>
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
              {/* <div className="cartListInfoContainer"> */}
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
                <button
                  onClick={() =>
                    handleAmountChange(index, productAmount[index] - 1)
                  }
                >
                  &#x2212;
                </button>
                <input
                  type="number"
                  min="1"
                  value={productAmount[index] ?? 1}
                  onChange={(e) => handleAmountChange(index, e.target.value)}
                />
                <button
                  onClick={() =>
                    handleAmountChange(index, productAmount[index] + 1)
                  }
                >
                  &#x2b;
                </button>
              </div>
              <p className="cartListTotal text-center">
                {product.price * productAmount[index] + " kr"}
              </p>
              {/* </div> */}
              <button
                onClick={() =>
                  setCart(cart.filter((item) => item.id !== product.id))
                }
              >
                <p className="cartListRemove">&#x2715;</p>
              </button>
            </div>
          ))}
          <Link
            to="/"
            className="backToShop link"
            onClick={() => {
              window.scrollTo(0, 0)
              resetNavbar()
            }}
          >
            <b>&larr; Tilbake til butikken</b>
          </Link>
        </div>
        <div className="cartSidePanels">
          <div className="cartSummary">
            <div className="headerContainer">
              <h1>Sammendrag</h1>
            </div>
            <div className="detailsContainer">
              <div>
                <p>Pris</p>
                <p>{totalProductsPrice.toFixed(2)}</p>
              </div>
              <div>
                <p>Frakt</p>
                <p>{shipping}</p>
              </div>
              <div>
                <p>Rabatt</p>
                <p>{rabatt}</p>
              </div>
            </div>
            <div className="totalContainer">
              <h1>Totalsum</h1>
              <h1>{totalProductsPrice + shipping + rabatt}</h1>
            </div>
          </div>
          <button className="checkoutButton">
            <h3>Til kasse</h3>
          </button>
        </div>
      </div>
    </section>
  )
}

export default ShoppingCart
