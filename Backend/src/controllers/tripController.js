import Trip from "../models/Trip.js"

// Create Trip
export const createTrip = async (req, res) => {
  try {
    const trip = await Trip.create(req.body)
    return res.status(201).json(trip)
  } catch (error) {
    console.error("❌ createTrip Error:", error)

    return res.status(400).json({
      message: "Failed to create trip",
      error: error.message,
      details: error.errors || null,
    })
  }
}

// Get Trips with filters
export const getTrips = async (req, res) => {
  try {
    const q = {}

    if (req.query.departure_city) q.departure_city = req.query.departure_city
    if (req.query.arrival_city) q.arrival_city = req.query.arrival_city

    if (req.query.date) {
      const d = new Date(req.query.date)
      const next = new Date(d)
      next.setDate(d.getDate() + 1)

      q.departure_time = { $gte: d, $lt: next }
    }

    const trips = await Trip.find(q).populate("office_id bus_id")

    return res.status(200).json(trips)
  } catch (error) {
    console.error("❌ getTrips Error:", error)
    return res
      .status(500)
      .json({ message: "Server error", error: error.message })
  }
}

// Get Trip by ID
export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id).populate("office_id bus_id")

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" })
    }

    return res.status(200).json(trip)
  } catch (error) {
    console.error("❌ getTripById Error:", error)

    return res.status(400).json({
      message: "Invalid trip ID",
      error: error.message,
    })
  }
}

// Update Trip
export const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" })
    }

    return res.status(200).json(trip)
  } catch (error) {
    console.error("❌ updateTrip Error:", error)

    return res.status(400).json({
      message: "Failed to update trip",
      error: error.message,
    })
  }
}

// Delete Trip
export const deleteTrip = async (req, res) => {
  try {
    const deleted = await Trip.findByIdAndDelete(req.params.id)

    if (!deleted) {
      return res.status(404).json({ message: "Trip not found" })
    }

    return res.status(200).json({ message: "Trip deleted successfully" })
  } catch (error) {
    console.error("❌ deleteTrip Error:", error)

    return res.status(400).json({
      message: "Failed to delete trip",
      error: error.message,
    })
  }
}
