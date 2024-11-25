const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()

// Middleware
app.use(express.json())

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))

// ChatGPT: "Legg til i server.js for å håndtere produkter:"
const Product = require("./models/Product")

// Opprett nytt produkt
app.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body)
    const savedProduct = await product.save()
    res.status(201).json(savedProduct)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Hent alle produkter
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
