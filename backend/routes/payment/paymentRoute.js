const express = require("express")
const Stripe = require("stripe")
const router = express.Router()

const stripe = new Stripe(
  process.env.sk_test_51QURsvJAFUmCNwMp8X47x2ruQgFQKT44H7vngQKNBQ57QoU0dPGWQODXIUDffQgfYhOc5lskU7lFo09EoKAwoYcR00TlIei5O7
)

router.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body

  try {
    // Create a PaymentIntent with test mode
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    })

    res.status(200).json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Payment intent creation failed" })
  }
})

module.exports = router
