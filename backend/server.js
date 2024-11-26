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

// Start Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
