import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// ===========================
// REGISTER USER
// ===========================
export const register = async (req, res) => {
  try {
    const { full_name, phone, email, password, role, office_id } = req.body

    if (!full_name || !phone || !password) {
      return res
        .status(400)
        .json({ message: "Full name, phone and password are required" })
    }

    // Check if phone exists
    const phoneExists = await User.findOne({ phone })
    if (phoneExists) {
      return res.status(400).json({ message: "Phone already in use" })
    }

    // Check if email exists (optional)
    if (email) {
      const emailExists = await User.findOne({ email })
      if (emailExists) {
        return res.status(400).json({ message: "Email already in use" })
      }
    }

    const hashed = await bcrypt.hash(password, 10)
    const profile_image = req.file?.path || null

    const user = await User.create({
      full_name,
      phone,
      email,
      password_hash: hashed,
      role: role || "customer",
      office_id: role !== "customer" ? office_id : null,
      profile_image,
    })

    return res.status(201).json({
      message: "User created successfully",
      user,
    })
  } catch (err) {
    console.error("❌ Register Error:", err)
    return res.status(500).json({ message: err.message })
  }
}

// ===========================
// LOGIN USER
// ===========================
export const login = async (req, res) => {
  try {
    const { phone, password } = req.body

    if (!phone || !password) {
      return res
        .status(400)
        .json({ message: "Phone and password are required" })
    }

    const user = await User.findOne({ phone })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const match = await bcrypt.compare(password, user.password_hash)
    if (!match) {
      return res.status(400).json({ message: "Incorrect password" })
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, office_id: user.office_id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    return res.json({
      message: "Login successful",
      token,
      user,
    })
  } catch (err) {
    console.error("❌ Login Error:", err)
    return res.status(500).json({ message: err.message })
  }
}
