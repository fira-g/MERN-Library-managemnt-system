import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const borrowStore = create((set,get)=>({
    requests : [],
    isSendingRequest : false,
    takenBooks : [],
    isReturning: false,

    getRequests : async ()=>{
        try {
            const res = await axiosInstance.get("/borrow/requests")
            set({requests:res.data})
        } catch (error) {
            console.log("couldn't get requests")
            toast.error(error.response.data.message)
        }  
    },
    sendRequest : async(bookId)=> {
        set({isSendingRequest:true})
        try {
            const {requests} = get()
            const res = await axiosInstance.post(`/borrow/borrow/${bookId}`)
            set({requests:[ ...requests , res.data]})
        } catch (error) {
            console.log("Error in sending request")
            console.error(error)
            toast.error("Error in sending request")
        }finally{
            set({isSendingRequest:false})
        }
        
    },
    approveRequest : async (bookId) =>{
        try {
            const res = await axiosInstance.post(`/borrow/approve/${bookId}`)
            set({requests: res.data})
        } catch (error) {
            console.log("Error in approving request")
            toast.error("Error in approving request")
        }
    },
    myBooks : async()=>{
        try {
            const res = await axiosInstance.get('/borrow/myBooks')
            set({takenBooks:res.data})
        } catch (error) {
            console.log("Error in getting ur books")
            toast.error("cannot get Your books")
        }
        
    },
    returnBook : async (bookId) =>{
        set({isReturning:true})
        try {
            const res = await axiosInstance.post(`/borrow/return/${bookId}` )
            set({requests: res.data})
        } catch (error) {
            console.log("Error in returning book")
            toast.error("Error in returning book")
        }finally{
            set({isReturning:false})
        }
    }
}))