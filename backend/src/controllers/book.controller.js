import Book from "../models/books.model.js";


export const getBooks = async (req,res) =>{
    
    try {
        const books = await Book.find({isActive : {$ne:false}})
        res.status(200).json(books)
    } catch (error) {
        console.log("Error in getting books")
        res.status(500).json({message:"internal server error."})
    }
}

export const getAvailableBooks = async (req,res) =>{
    
    try {
        const books = await Book.find({available : {$ne:false}})
        res.status(200).json(books)
    } catch (error) {
        console.log("Error in getting available books")
        res.status(500).json({message:"internal server error."})
    }
}


export const addBook = async (req,res) =>{
    try {
        const {bookName ,bookCategory, authorName} = req.body

        const newBook = await new Book({
            bookName,
            bookCategory,
            authorName,
            available:true
        })

        await newBook.save()
        res.status(201).json(newBook)
        
    } catch (error) {
        console.log("Error in adding books")
        res.status(500).json({message:"internal server error."})
        
    }
    
} 

export const deleteBook = async (req,res)=>{
    try {
        const bookId = req.params.bookId
        console.log(bookId)
        await Book.findByIdAndDelete(bookId)
        res.status(200).json({
            message:"book deleted!"
        })
    } catch (error) {
        console.error(error)
        console.log("Error in deleting books.")
        res.status(500).json({
            message:"Internal Server Error."
        })
    }
}