const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  price: Number,
  currency: String,
  category: String,
  stock: Number,
  sizes: [String],
  colors: [String],
  rating: Number,
  images: [String],
  isFeatured: Boolean,
})

const Item = mongoose.model("Item", itemSchema, "products")

module.exports = Item
