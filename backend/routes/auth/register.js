const express = require("express")
const bcrypt = require("bcryptjs")
const User = require("../../models/User")
const router = express.Router()

router.post("/", async (req, res) => {
  const { username, email, password } = req.body
  console.log(req.body)

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({ username, email, password: hashedPassword })
    await user.save()

    res.status(201).json({ message: "User registered successfully" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router
