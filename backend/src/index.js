import express from "express"
import {connectDB} from "./lib/db.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path"
import adminRoutes from "./routes/auth.admin.route.js"
import userRoutes from "./routes/auth.user.route.js"
import bookRoutes from "./routes/book.route.js"
import borrowRoutes from "./routes/borrowRequest.route.js"

dotenv.config()

const port = process.env.PORT
const __dirname = path.resolve()

const app = express()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth/admin" , adminRoutes)
app.use("/api/auth/user" , userRoutes)
app.use("/api/books" , bookRoutes)
app.use("/api/borrow" , borrowRoutes)


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*" ,(req,res)=>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

app.listen(port, ()=>{
    console.log(`app running on port ${port}`)
    connectDB()
})