import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { db } from "./config/db.js"
import authRoutes from "./routes/authRoute.js"

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json());

app.use(cors({
    origin: '*',
    credentials: "true",
    allowHeaders: ['Content-type', 'Authorization']
}))


app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use('/api/v1/auth', authRoutes)
app.listen(PORT, () => {
    db();
    console.log(`🚀 Server running on port ${PORT}`)
})