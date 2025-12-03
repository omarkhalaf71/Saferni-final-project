import Bus from "../models/Bus.js"

// CREATE BUS
export const createBus = async (req, res) => {
  try {
    const { office_id, bus_number, seat_count, layout_type, model_name } =
      req.body

    if (!office_id) {
      return res.status(400).json({ message: "office_id is required" })
    }

    const bus = await Bus.create({
      office_id,
      bus_number,
      seat_count,
      layout_type,
      model_name,
    })

    return res.status(201).json(bus)
  } catch (error) {
    console.error("❌ createBus Error:", error)
    return res.status(400).json({
      message: "Failed to create bus",
      error: error.message,
      details: error.errors || null,
    })
  }
}

// GET ALL BUSES
export const getBuses = async (req, res) => {
  try {
    const buses = await Bus.find().populate("office_id", "office_name")
    return res.status(200).json(buses)
  } catch (error) {
    console.error("❌ getBuses Error:", error)
    return res
      .status(500)
      .json({ message: "Server error", error: error.message })
  }
}

// UPDATE BUS
export const updateBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" })
    }

    return res.status(200).json(bus)
  } catch (error) {
    console.error("❌ updateBus Error:", error)
    return res.status(400).json({
      message: "Failed to update bus",
      error: error.message,
    })
  }
}

// DELETE BUS
export const deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id)

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" })
    }

    return res.status(200).json({ message: "Bus deleted successfully" })
  } catch (error) {
    console.error("❌ deleteBus Error:", error)
    return res.status(400).json({
      message: "Failed to delete bus",
      error: error.message,
    })
  }
}
