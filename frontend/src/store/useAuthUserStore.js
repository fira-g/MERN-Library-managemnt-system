
import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast"


const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001":"/"

export const useAuthUserStore = create((set,get) => ({
    authUser: null,
    isSigningUp : false,
    isLoggingUp: false,
    isUpdatingProfile: false,
    isCheckingUserAuth : false,
    checkUserAuth : async () =>{
        set({isCheckingUserAuth:true})
        try {
            const res = await axiosInstance.get("/auth/user/check")
            set({authUser : res.data})
        } catch (error) {
            console.log("Error in chekAuth : ", error)
            set({authUser : null})
        }finally{
            set({isCheckingUserAuth:false})
        }
    },
    signup : async (data) =>{
        set({isSigningUp : true})
        try {
            
            const res = await axiosInstance.post("/auth/user/signup" , data)
            set({authUser:res.data})
            toast.success("Account created successfully.")
            
        } catch (error) {
            toast.error(error.response.data.message)   
        }finally{
            set({isSigningUp: false})
        }
    },

    logout: async () =>{
        try {
            await axiosInstance.post("/auth/user/logout")
            set({authUser:null})
            toast.success("Logged out successfully")
            get().disconnectSocket()    
        } catch (error) {
            toast.error("Something went wrong")
        }    
    },
    login: async(data)=>{
        set({isLoggingUp:true})
        try {
            const res = await axiosInstance.post("/auth/user/login", data)
            set({authUser:res.data})
            toast.success("Logged In Successfully")
            
        } catch (error) {
            console.error("error login: " , error)
            toast.error(error.response.data.message)
        } finally{
            set({isLoggingUp:false})
        }
    },
   
}))