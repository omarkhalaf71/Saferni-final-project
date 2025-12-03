import User from "../models/User.js"
import bcrypt from "bcryptjs"

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("office_id", "office_name")
    return res.status(200).json(users)
  } catch (error) {
    console.error("❌ getUsers Error:", error)
    return res
      .status(500)
      .json({ message: "Server error", error: error.message })
  }
}

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "office_id",
      "office_name"
    )
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    return res.status(200).json(user)
  } catch (error) {
    console.error("❌ getUserById Error:", error)

    return res
      .status(500)
      .json({ message: "Server error", error: error.message })
  }
}

// Update user
export const updateUser = async (req, res) => {
  try {
    let data = { ...req.body }

    // Password hashing
    if (data.password) {
      data.password_hash = await bcrypt.hash(data.password, 10)
      delete data.password
    }

    // Image
    if (req.file) {
      data.profile_image = req.file.path
    }

    const user = await User.findByIdAndUpdate(req.params.id, data, {
      new: true,
    })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    return res.status(200).json(user)
  } catch (error) {
    console.error("❌ updateUser Error:", error)

    return res
      .status(500)
      .json({ message: "Server error", error: error.message })
  }
}

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id)

    if (!deleted) {
      return res.status(404).json({ message: "User not found" })
    }

    return res.status(200).json({ message: "User deleted successfully" })
  } catch (error) {
    console.error("❌ deleteUser Error:", error)
    return res
      .status(500)
      .json({ message: "Server error", error: error.message })
  }
}
