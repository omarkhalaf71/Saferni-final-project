import Booking from "../models/Booking.js"
import Trip from "../models/Trip.js"
import User from "../models/User.js"
import { generateQRCode } from "../utils/qrcode.js"
import { sendEmail } from "../utils/email.js"

// ===========================
// CREATE BOOKING
// ===========================
export const createBooking = async (req, res) => {
  try {
    const { trip_id, seat_num } = req.body
    const user_id = req.user?.id

    if (!trip_id || !seat_num) {
      return res
        .status(400)
        .json({ message: "trip_id and seat_num are required" })
    }

    // Check trip exists
    const trip = await Trip.findById(trip_id)
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" })
    }

    // Check seat availability
    const existing = await Booking.findOne({
      trip_id,
      seat_num,
      status: "confirmed",
    })

    if (existing) {
      return res.status(400).json({ message: "Seat already booked" })
    }

    // Create booking
    const booking = await Booking.create({
      trip_id,
      user_id,
      seat_num,
      status: "confirmed",
      payment_status: "unpaid",
    })

    // Generate QR Code
    booking.qr_code = await generateQRCode(
      `${booking._id}|${trip_id}|${user_id}`
    )

    // If proof image uploaded
    if (req.file) booking.proof_image = req.file.path

    await booking.save()

    // Send email if user has email
    const user = await User.findById(user_id)

    if (user?.email) {
      const html = `
        <h3 style="font-family: sans-serif;">Booking Confirmed ✔</h3>
        <p>Trip: <strong>${trip.departure_city} → ${trip.arrival_city}</strong></p>
        <p>Seat Number: <strong>${seat_num}</strong></p>
        <p>Your QR Code:</p>
        <img src="${booking.qr_code}" alt="QR Code"/>
      `

      try {
        await sendEmail({
          to: user.email,
          subject: "Booking Confirmation",
          html,
        })
      } catch (emailErr) {
        console.error("Email Error:", emailErr.message)
      }
    }

    return res.status(201).json(booking)
  } catch (err) {
    console.error("❌ createBooking Error:", err)
    return res.status(500).json({
      message: "Failed to create booking",
      error: err.message,
    })
  }
}

// ===========================
// GET BOOKINGS
// ===========================
export const getBookings = async (req, res) => {
  try {
    const filter = {}

    // إذا كان مستخدم عادي ⇒ رجّع حجوزاتو فقط
    if (req.user.role === "customer") {
      filter.user_id = req.user.id
    }

    const bookings = await Booking.find(filter)
      .populate("trip_id")
      .populate("user_id", "full_name email")

    return res.status(200).json(bookings)
  } catch (err) {
    console.error("❌ getBookings Error:", err)
    return res.status(500).json({ message: "Server error", error: err.message })
  }
}

// ===========================
// CANCEL BOOKING
// ===========================
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" })
    }

    booking.status = "cancelled"
    await booking.save()

    return res.status(200).json({
      message: "Booking cancelled",
      booking,
    })
  } catch (err) {
    console.error("❌ cancelBooking Error:", err)
    return res.status(500).json({
      message: "Failed to cancel booking",
      error: err.message,
    })
  }
}
