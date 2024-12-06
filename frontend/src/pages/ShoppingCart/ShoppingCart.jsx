import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useCart } from "../../context/CartContext"
import "./ShoppingCart.css"

function ShoppingCart({
  resetNavbar,
  // cartProducts,
  // setCartProducts
}) {
  const [productAmount, setProductAmount] = useState([])
  const [shipping, setShipping] = useState(0)
  const [isAddDiscount, setIsAddDiscount] = useState(false)
  const [isDiscount, setIsDiscount] = useState(false)
  const [discountInput, setDiscountInput] = useState("")
  const [discount, setDiscount] = useState(0)

  // const testArray = []

  const navigate = useNavigate()

  const { cart, setCart } = useCart()

  useEffect(() => {
    if (cart.length > 0) {
      setProductAmount(new Array(cart.length).fill(1))
      setShipping(79)
    } else {
      setShipping(0)
    }
  }, [cart])

  async function handlePurchase(cart) {
    try {
      const response = await axios.post("http://localhost:5000/api/purchase", {
        cartItems: cart.map((item, index) => ({
          productId: item.id,
          quantity: productAmount[index] || 1,
        })),
      })

      console.log(response.data.message) // Display success message
      // Clear cart or redirect to a success page if needed
      setCart([]) // Clear cart after purchas
      navigate("/suksess")
    } catch (error) {
      console.error("Purchase error:", error.response?.data || error.message)
      alert(error.response?.data?.error || "An error occurred during purchase.")
    }
  }

  const totalProductsPrice = cart.reduce((total, product, index) => {
    return total + product.price * (productAmount[index] || 1)
  }, 0)

  const handleAmountChange = (index, value) => {
    const updatedAmounts = [...productAmount]
    const newValue = Math.max(1, parseInt(value) || 1) // Minimum value is 1
    updatedAmounts[index] = newValue
    setProductAmount(updatedAmounts)
  }

  const handleAddDiscount = () => {
    setIsAddDiscount(true)
  }

  return (
    <section className="cartMainSection">
      <h1 className="cartMainHeader">ShoppingCart</h1>

      <div className="shoppingCart">
        <div className="cartList">
          <div className="cartListCategories">
            <p>Produkt</p>
            <div className="calculationsHeadersContainer">
              <div></div>
              <div className="headers">
                <p className="text-center calculations-headers">Pris</p>
                <p className="text-center calculations-headers">Antall</p>
                <p className="text-center calculations-headers">Sum</p>
              </div>
            </div>
          </div>
          {/* {cartProducts.map((product) => ( */}
          {/* {cart.map((product, index) => ( */}
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
              <div className="rowInfo">
                <div className="cartListTextContainer">
                  <p className="cartListName">{product.name.split(" - ")[0]}</p>
                  <p className="cartListAlternatives">
                    {/* Eventuell størrelse og/eller farge */}
                    Lorem ipsum dolor
                  </p>
                </div>
                <div className="cartListCalculations">
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
                      onChange={(e) =>
                        handleAmountChange(index, e.target.value)
                      }
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
                  <div className="cartListRemove">
                    <button
                      onClick={() =>
                        setCart(cart.filter((item) => item.id !== product.id))
                      }
                    >
                      <p>&#x2715;</p>
                    </button>
                  </div>
                </div>
              </div>
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
                <p>{totalProductsPrice.toFixed(2) + " " + "kr"}</p>
              </div>
              {cart.length > 0 && (
                <div>
                  <p>Frakt</p>
                  <p>{shipping.toFixed(2) + " " + "kr"}</p>
                </div>
              )}
              <div>
                {!isDiscount && (
                  <>
                    {isAddDiscount ? (
                      <>
                        <input
                          type="text"
                          className="discountInput"
                          value={discountInput}
                          onChange={(e) => setDiscountInput(e.target.value)}
                        />
                        <button
                          className="discountAdd"
                          onClick={() => {
                            if (discountInput === "RABATT50") {
                              setIsDiscount(true)
                              setDiscount(-50)
                            } else {
                              alert("Ugyldig rabattkode")
                            }
                          }}
                        >
                          Legg til
                        </button>
                      </>
                    ) : (
                      <button
                        style={{ color: "#2b9c20" }}
                        onClick={() => handleAddDiscount()}
                      >
                        Legg til rabattkode &rarr;
                      </button>
                    )}
                  </>
                )}
                {isDiscount && (
                  <>
                    <p>Rabatt</p>
                    <p>{discount.toFixed(2) + " " + "kr"}</p>
                  </>
                )}
              </div>
            </div>
            <div className="totalContainer">
              <h1>Totalsum</h1>
              <h1>
                {(totalProductsPrice + shipping + discount).toFixed(2) +
                  " " +
                  "kr"}
              </h1>
            </div>
          </div>
          <button
            className="checkoutButton"
            onClick={() => {
              if (cart.length === 0) {
                alert("Cart is empty. Please add items before checking out.")
              } else {
                handlePurchase(cart, productAmount)
              }
            }}
            disabled={cart.length === 0}
          >
            <h3>Til kasse</h3>
          </button>
        </div>
      </div>
    </section>
  )
}

export default ShoppingCart
