import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import route from "./routes/userRoute.js"

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
dotenv.config();


const PORT = process.env.PORT || 4000;
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(() => {
    console.log("Database sucessfully connected mongoose....")

    app.listen(PORT, () => {
        console.log("Server on starting on", PORT)
    })
}).catch(err => { console.log(err) });

app.use("/api",route)
