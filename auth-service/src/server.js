import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { db } from "./config/db"

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

app.listen(PORT, () => {
    db();
    console.log(`🚀 Server running on port ${PORT}`)
})