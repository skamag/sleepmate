const express = require("express")
const User = require("../models/User")

const router = express.Router()

// Add new user (admin only)
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body)
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (err) {
    console.error("Error creating user:", err.message)
    res.status(500).json({ error: err.message })
  }
})

// Get all users (admin only)
router.get("/", async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    console.error("Error fetching users:", err.message)
    res.status(500).json({ error: err.message })
  }
})

// Update a user (e.g., role change)
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" })
    }
    res.status(200).json(updatedUser)
  } catch (err) {
    console.error("Error updating user:", err.message)
    res.status(500).json({ error: err.message })
  }
})

// Delete a user
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" })
    }
    res.status(200).json({ message: "User deleted successfully" })
  } catch (err) {
    console.error("Error deleting user:", err.message)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
