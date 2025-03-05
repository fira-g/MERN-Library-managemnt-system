import express from "express"
import { signup,login,logout,checkAuth } from "../controllers/auth.admin.controller.js"
import {protectRout} from "../middleware/protector.middleware.js"

const router = express.Router()

router.post("/signup" , signup)
router.post("/login" , login)
router.post("/logout" , logout)
router.get("/check" , protectRout,checkAuth)

export default router