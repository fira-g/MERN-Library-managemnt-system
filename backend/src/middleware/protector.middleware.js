import Admin from "../models/admin.model.js"
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"

export const protectRout = async (req,res,next) =>{ 
    try {
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({message: "Unauthorized - no fucking token provided."})
        }

        const decoded =  jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({message: "Unauthorized - Invalid token."})
        }

        const admin = await Admin.findById(decoded.userId).select("-password")   // .userId may sometimes be .sub

        if(!admin){
            return res.status(404).json({message: "User not found"})
        }

        req.user = admin
        next()

    } catch (error) {
        console.log("Error in protector middleware" , error.message)
        res.status(500).json({message: "Internal server error."})
    }
}