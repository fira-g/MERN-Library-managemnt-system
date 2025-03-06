import Request from "../models/borrowRequests.js";
import Book from "../models/books.model.js";
import mongoose from "mongoose";

export const sendRequest = async(req, res)=>{
    try {
        const senderName = req.user.fullName
        const senderId = req.user._id
        const bookId = req.params.bookId
        const book = await Book.findOne({_id: bookId})

        const newRequest = new Request({
            senderId,
            senderName,
            bookId,
            bookName:book?.bookName,
            isActive : true
        })

        await newRequest.save()
        await Book.updateOne({_id:bookId}, {$set: {available:false}})
        res.status(201).json(newRequest)
        
    } catch (error) {
        console.log("error in send request controller" , error.message)
        res.status(500).json({
            message:"Internal server error."
        })
        console.error(error)
    }
}

export const getRequest = async (req,res) =>{
    try {
        const activeRequests = await Request.find({isActive:{$ne:false}})
        res.status(200).json(activeRequests)
        
    } catch (error) {
        console.log("Error in getRequest controller")
        res.status(500).json({message:"Internal Server Error."})
    }    
}

export const approveRequest = async (req,res) =>{
    try {
        const {bookId} = req.params
        const activeRequests = await Request.updateOne({bookId:bookId}, {$set: {isActive:false}})
        await Book.updateOne({_id:bookId}, {$set: {available:false}})

        res.status(200).json(activeRequests)
        
    } catch (error) {
        console.log("Error in approveRequest controller")
        res.status(500).json({message:"Internal Server Error."})
    }
}

export const myBooks =async (req,res) =>{
    try {
        
        const myId = req.user._id
        const myBooks = await Request.find({senderId:myId,isActive:false})
        res.status(200).json(myBooks)
    } catch (error) {
        console.log("Error in getting mybooks controller")
        res.status(500).json({message:"Internal Server Error."})
    }
    
}

export const returnBook = async (req,res) =>{
    try {
        const {bookId} = req.params
        
        await Request.findOneAndDelete({bookId:bookId})
        await Book.updateOne({_id:bookId}, {$set: {available:true}})
        const activeRequests = await Request.find({isActive:{$ne:false}})
        res.status(200).json(activeRequests)
        
    } catch (error) {
        console.log("Error in approveRequest controller")
        res.status(500).json({message:"Internal Server Error."})
    }
}