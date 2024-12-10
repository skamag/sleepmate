import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import App from "./App.jsx"

const stripePromise = loadStripe(
  "pk_test_51QURsvJAFUmCNwMpB7bIg1ReSSPcohLqrLsG3RH21ZYexu2lXuoSr45970cuEsmj2uuy4rGYoXwwqosraQ9fjU2K00fqx5f4H3"
)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </StrictMode>
)
