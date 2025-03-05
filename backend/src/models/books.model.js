import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        bookName:{
            type: String,
            required:true,
        },

        bookCategory:{
            type: String,
            required:true,
        },

        authorName:{
            type: String,
            required:true,
        },
        available:{
            type:Boolean
        }
       
    },{timestamps:true}
)

const Book = mongoose.model("Book" , userSchema);
export default Book;