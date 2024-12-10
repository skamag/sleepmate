import { useState } from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axios from "axios"
import "./Payment.css"

function Payment() {
  const stripe = useStripe()
  const elements = useElements()

  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handlePayment = async (e) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      const { data } = await axios.post("/api/create-payment-intent", {
        amount: 5000, // Amount in cents
      })

      const cardElement = elements.getElement(CardElement)

      const paymentResult = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
        },
      })

      if (paymentResult.error) {
        setError(paymentResult.error.message)
      } else {
        setSuccess("Payment successful!")
      }
    } catch (err) {
      setError("Payment failed. Please try again.")
    }

    setIsProcessing(false)
  }

  return (
    <form className="paymentComponent" onSubmit={handlePayment}>
      <CardElement />
      <button type="submit" disabled={!stripe || isProcessing}>
        {isProcessing ? "Processing..." : "Pay $50"}
      </button>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </form>
  )
}

export default Payment
