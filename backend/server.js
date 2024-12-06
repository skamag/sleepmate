const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err))

// Model
const Item = require("./models/Item")

// Routes
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

// Handle purchase
app.post("/api/purchase", async (req, res) => {
  const { cartItems } = req.body // Expecting an array of { id, quantity } objects

  try {
    if (!cartItems) {
      return res.status(400).json({ error: "cartItems is required." })
    }

    for (const item of cartItems) {
      console.log("Processing item:", item)

      const product = await Item.findOne({ id: item.productId }) // Match `id` instead of `_id`

      if (!product) {
        return res
          .status(404)
          .json({ error: `Item with ID ${item.productId} not found.` })
      }

      // Check stock
      if (product.stock < item.quantity) {
        return res.status(400).json({
          error: `Insufficient stock for product ${product.name}. Requested: ${item.quantity}, Available: ${product.stock}`,
        })
      }

      // Reduce stock
      product.stock -= item.quantity

      // Save the updated product
      await product.save()
    }

    res.status(200).json({ message: "Purchase successful, stock updated." })
  } catch (err) {
    console.error("Error in /api/purchase:", err.message)
    res.status(500).json({ error: "Internal server error." })
  }
})

// Start Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
