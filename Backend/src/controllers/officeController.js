import Office from "../models/Office.js"

// Create Office
export const createOffice = async (req, res) => {
  try {
    const logo_url = req.file?.path || null
    const { office_name, city, phone_number, address } = req.body

    if (!office_name || !city || !phone_number || !address) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    const office = await Office.create({
      office_name,
      city,
      phone_number,
      address,
      logo_url,
      status: "pending",
    })

    return res.status(201).json(office)
  } catch (error) {
    console.error("❌ createOffice Error:", error)
    return res.status(400).json({
      message: "Failed to create office",
      error: error.message,
      details: error.errors || null,
    })
  }
}

// Get All Offices
export const getOffices = async (req, res) => {
  try {
    const offices = await Office.find()
    return res.status(200).json(offices)
  } catch (error) {
    console.error("❌ getOffices Error:", error)
    return res
      .status(500)
      .json({ message: "Server error", error: error.message })
  }
}

// Update Office
export const updateOffice = async (req, res) => {
  try {
    const data = { ...req.body }

    if (req.file) data.logo_url = req.file.path

    const office = await Office.findByIdAndUpdate(req.params.id, data, {
      new: true,
    })

    if (!office) {
      return res.status(404).json({ message: "Office not found" })
    }

    return res.status(200).json(office)
  } catch (error) {
    console.error("❌ updateOffice Error:", error)
    return res.status(400).json({
      message: "Failed to update office",
      error: error.message,
    })
  }
}

// Delete Office
export const deleteOffice = async (req, res) => {
  try {
    const deleted = await Office.findByIdAndDelete(req.params.id)

    if (!deleted) {
      return res.status(404).json({ message: "Office not found" })
    }

    return res.status(200).json({ message: "Office deleted successfully" })
  } catch (error) {
    console.error("❌ deleteOffice Error:", error)
    return res.status(400).json({
      message: "Failed to delete office",
      error: error.message,
    })
  }
}
