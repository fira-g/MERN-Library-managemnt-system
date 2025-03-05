import express from "express"
import { sendRequest,getRequest,approveRequest,returnBook, myBooks } from "../controllers/borrowRequest.controller.js"
import {protectRout} from "../middleware/protector.middleware.js"
import {protectUserRout} from "../middleware/protector.user.middleware.js"

const router = express.Router()

router.post("/borrow/:bookId" ,protectUserRout, sendRequest)
router.get("/requests" ,protectRout, getRequest)
router.get("/myBooks" ,protectUserRout, myBooks)
router.post("/approve/:bookId" ,protectRout,approveRequest)
router.post("/return/:bookId",protectUserRout, returnBook)

export default router