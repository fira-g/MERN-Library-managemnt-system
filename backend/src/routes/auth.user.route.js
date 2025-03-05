import express from "express"
import { signup,login,logout,checkAuth } from "../controllers/auth.user.controller.js"
import { protectUserRout } from "../middleware/protector.user.middleware.js"

const router = express.Router()

router.post("/signup" , signup)
router.post("/login" , login)
router.post("/logout" , logout)
router.get("/check" , protectUserRout,checkAuth)

export default router