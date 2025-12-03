import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"

// Load env
dotenv.config()

import authRoutes from "./src/routing/auth.js"
import usersRoutes from "./src/routing/users.js"
import officesRoutes from "./src/routing/offices.js"
import busesRoutes from "./src/routing/buses.js"
import tripsRoutes from "./src/routing/trips.js"
import bookingsRoutes from "./src/routing/bookings.js"
import connectDB from "./src/config/db.js"

const app = express()

app.use(cors())
app.use(express.json())

// Serve uploads
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes)
app.use("/api/offices", officesRoutes)
app.use("/api/buses", busesRoutes)
app.use("/api/trips", tripsRoutes)
app.use("/api/bookings", bookingsRoutes)

// Connect to DB
connectDB()

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on ${PORT}`))
