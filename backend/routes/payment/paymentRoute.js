const express = require("express")
const router = express.Router()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// require("dotenv").config()

router.post("/create-payment-intent", async (req, res) => {
  console.log("Request received to /create-payment-intent", req.body)

  const { amount } = req.body

  try {
    // Create a PaymentIntent with test mode
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Ensure the amount is provided in the smallest currency unit (e.g., cents for USD)
      currency: "usd",
      payment_method_types: ["card"],
    })

    // Send the client secret to the client
    res.status(200).json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error("Error creating payment intent:", error)
    res.status(500).json({ error: "Payment intent creation failed" })
  }
})

module.exports = router
