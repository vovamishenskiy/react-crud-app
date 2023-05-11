import { express } from "express"
import { dotenv } from "dotenv"
import connectDB from "./config/db"
import path from "path"
import noteRoutes from "./routes/noteRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config()

connectDB()

const app = express()
app.use(express.json())
app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("api is running")
})

app.use(notFound)
app.use(errorHandler)

const PORT = 5000
app.listen(PORT, console.log(`server is running in port ${PORT}`))