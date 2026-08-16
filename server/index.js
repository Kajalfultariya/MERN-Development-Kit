import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import route from "./routes/userRoute.js"

const app = express()

app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "https://mern-development-kit.vercel.app",
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
dotenv.config();
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MERN backend is running",
  });
});

const PORT = process.env.PORT || 4000;
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(() => {
    console.log("Database sucessfully connected mongoose....")

    app.listen(PORT, () => {
        console.log("Server on starting on", PORT)
    })
}).catch(err => { console.log(err) });

app.use("/api", route)
