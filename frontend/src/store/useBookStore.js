import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


export const bookStore = create((set,get) =>({
    books: [],
    available: [],
    isAdding : false,

    getBooks: async() =>{
        try {
            const res = await axiosInstance.get("/books/get")
            set({books:res.data})    
        } catch (error) {
            toast.error(error.response.data.message)
        }
        
    },

    getAvailable: async() =>{
        try {
            const res = await axiosInstance.get("books/available")
            set({available : res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    add: async(data) =>{
        set({isAdding:true})
        const {books} = get()
        try {
            const res = await axiosInstance.post("/books/add", data)
            set({books:[...books , res.data]})
            toast.success("Book added Successfully")
            
        } catch (error) {
            toast.error("Error in adding books")
            console.error(error)
        }finally{
            set({isAdding:false})
        }
        
    },

    remove: async(bookId) =>{
        const {books} = get() 
        try {
            const res = await axiosInstance.delete(`/books/delete/${bookId}` )
            set({books:books.filter((item)=> item._id!==bookId)})
            toast.success("Book removed Successfully")
            
        } catch (error) {
            toast.error("couldn't delete")
            console.error(error)
        }
        
    }
}))