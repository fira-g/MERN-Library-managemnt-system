import { generateToken } from "../lib/utils.js";
import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs"

export const signup = async(req,res)=>{
    try {
        const {email, password, fullName, adminPassword} = req.body

        if(!password|| !adminPassword || !fullName || !email){
            return res.status(400).json({
                message:"All feilds are required."
            })
        }
    
        if(password.length<6) return res.status(400).json({message:"Password must be atleast 6 characters."})
    
        const admin = await Admin.findOne({email})
    
        if(admin){
            return res.status(400).json({message:"Email already exists"})
        }
    
        if(adminPassword != process.env.ADMIN_PASSWORD){
            return res.status(400).json({
                message:"Invalid Admin Password"
            })
        }
    
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
    
        const newAdmin = new Admin({
            email,
            password:hashedPassword,
            fullName
        })
    
        if(newAdmin){
            generateToken(newAdmin._id,res)
            await newAdmin.save()
    
            res.status(201).json({
                _id : newAdmin._id,
                fullName : newAdmin.fullName,
                email: newAdmin.email
            })
        }else{
            res.status(400).json({message: "Invalid admin data"})
        }
        
    } catch (error) {
        console.log("Error in admin Signup")
        res.status(500).json({message: "Internal server error."})
        
    }

}

export const login = async(req,res) =>{

    const {email, password, adminPassword} = req.body
    try {
        
        const admin = await Admin.findOne({email})
        if(!admin){
            return res.status(400).json({message:"Invalid credentials"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, admin.password)

        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"})
        }

        if(adminPassword != process.env.ADMIN_PASSWORD){
            return res.status(400).json({message:"Invalid credentials"})
        }

        generateToken(admin._id,res)
        res.status(200).json(admin)
    } catch (error) {
        console.log("Error in admin login")
        res.status(500).json({message:"Internal server Error."})
    }
}

export const logout = (req,res) =>{
    try {
        res.cookie("jwt" , "", {maxAge : 0})
        res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        console.log("Error in logout.")
        res.status(500).json({message:"Internal server Error"})
    }
}

export const checkAuth =  (req,res) =>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkout controller" , error.message)
        res.status(500).json({message: "Internal server error."})
    }
}