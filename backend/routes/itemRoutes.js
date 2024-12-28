const express = require("express")
const Item = require("../models/Item")

const router = express.Router()

// Create a new item
router.post("/", async (req, res) => {
  try {
    const newItem = new Item(req.body)
    const savedItem = await newItem.save()
    res.status(201).json(savedItem)
  } catch (err) {
    console.error("Error creating item:", err.message)
    res.status(500).json({ error: err.message })
  }
})

// Get all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find()
    res.json(items)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update an item
router.put("/api/items/:id", async (req, res) => {
  const { id } = req.params // Extract the ID from the route
  const updatedData = req.body // Data to update

  try {
    console.log("Incoming ID:", id)
    console.log("Updated data:", updatedData)

    // Update the item in the database
    const updatedItem = await Item.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Validate the updated data against the schema
    })

    if (!updatedItem) {
      console.error(`No item found with ID: ${id}`)
      return res.status(404).json({ error: "Item not found" })
    }

    console.log("Item updated successfully:", updatedItem)
    res.status(200).json(updatedItem)
  } catch (err) {
    console.error("Error updating item:", err.message)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Delete an item
router.delete("/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id)
    res.json({ message: "Item deleted successfully." })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
