import express from "express"
import { getBooks,addBook,deleteBook,getAvailableBooks } from "../controllers/book.controller.js"
import {protectRout} from "../middleware/protector.middleware.js"
import {protectUserRout} from "../middleware/protector.user.middleware.js"

const router = express.Router()

router.get("/get" , getBooks)
router.get("/available" ,protectUserRout, getAvailableBooks)
router.post("/add",protectRout, addBook)
router.delete("/delete/:bookId",protectRout, deleteBook)

export default router