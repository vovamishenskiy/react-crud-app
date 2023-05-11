import express from "express"
// import config from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import noteRoutes from "./routes/noteRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

// dotenv.config()

connectDB()

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/notes/", noteRoutes);
app.use("/api/users/", userRoutes);

app.get("/", (req, res) => {
    res.send("api is running")
})

app.use(notFound)
app.use(errorHandler)

const PORT = 5000
app.listen(PORT, console.log(`server is running in port ${PORT}`))