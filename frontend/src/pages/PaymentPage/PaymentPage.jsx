import React from "react"
import Payment from "../../components/payments/Payment"
import "./PaymentPage.css"

const PaymentPage = () => {
  return (
    <div className="payment-page">
      <div className="paymentHeader">
        <h1>Checkout</h1>
        <p>Complete your purchase securely using Stripe.</p>
      </div>
      <Payment />
    </div>
  )
}

export default PaymentPage
