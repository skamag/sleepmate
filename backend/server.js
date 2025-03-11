const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const registerRoute = require("./routes/auth/register")
const loginRoute = require("./routes/auth/login")
const paymentRoute = require("./routes/payment/paymentRoute")
const authenticate = require("./routes/auth/authenticate")
const itemRoutes = require("./routes/itemRoutes")
const userRoutes = require("./routes/userRoutes")

const Item = require("./models/Item")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/register", registerRoute)
app.use("/api/login", loginRoute)
app.use("/api", paymentRoute)
app.use("/api/items", itemRoutes)
app.use("/api/users", userRoutes)

app.get("/api/protected", authenticate, (req, res) => {
  res.status(200).json({ message: "Access granted!" })
})

app.get("/api/items", async (req, res) => {
  try {
    console.log("Fetching items...")
    const items = await Item.find()
    console.log("Items fetched:", items)
    res.json(items)
  } catch (err) {
    console.error("Error fetching items:", err)
    res.status(500).json({ message: err.message })
  }
})

app.post("/api/purchase", async (req, res) => {
  const { cartItems } = req.body

  try {
    if (!cartItems) {
      return res.status(400).json({ error: "cartItems is required." })
    }

    for (const item of cartItems) {
      console.log("Processing item:", item)

      const product = await Item.findOne({ id: item.productId })

      if (!product) {
        return res
          .status(404)
          .json({ error: `Item with ID ${item.productId} not found.` })
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          error: `Insufficient stock for product ${product.name}. Requested: ${item.quantity}, Available: ${product.stock}`,
        })
      }

      product.stock -= item.quantity
      await product.save()
    }

    res.status(200).json({ message: "Purchase successful, stock updated." })
  } catch (err) {
    console.error("Error in /api/purchase:", err.message)
    res.status(500).json({ error: "Internal server error." })
  }
})

// Connect to MongoDB and Start Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err))

  console.log("MongoDB URI:", process.env.MONGO_URI);
