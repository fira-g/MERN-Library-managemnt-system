import mongoose from "mongoose"
import User from "./user.model.js";
import Book from "./books.model.js";

const requestSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    senderName:{
        type:String,
        required:true
    },
    bookId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:Book,
        required:true
    },
    bookName: {
        type:String,
        required:true
    },
    isActive:{
        type: Boolean,
        required:true
    }
}, {timestamps:true})

const Request = mongoose.model("Request",requestSchema)

export default Request;