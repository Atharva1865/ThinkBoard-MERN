import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import RateLimiter from "./middleware/rateLimiter.js"

// console.log(process.env.MONGO_URI) // Prints undefined i.e we are not able to access the environment variable, SO WE WILL USE DOTENV PACKAGE
dotenv.config() // Now we can access the env variables
// console.log(process.env.MONGO_URI)

const app = express()
const PORT = process.env.PORT || 5001
const __dirname = path.resolve()

// Middleware -> Remember that the Order of the Middleware is Important
app.use(express.json())  // This Middeware will parse json bodies: req.body

// Custom Middleware example
// app.use((req,res,next) =>{
//     console.log(`Recieved a ${req.method} Request and Request URL is ${req.url}`) // Firstly, this gets printed
//     next()  // calls the method, for which the Request is hitted
// })

if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173",
    }))  // To solve the CORS error
}
// The RateLimiter's Middleware must be after the CORS's Middleware 
app.use(RateLimiter)
app.use("/api/notes", notesRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

connectDB().then(() => {  // First connect to database and then start to listen  (This is a small Optimization)
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT)
    })
})