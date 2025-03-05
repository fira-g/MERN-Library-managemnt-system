
import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast"


const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001":"/"

export const useAuthAdminStore = create((set,get) => ({
    authAdmin: null,
    isSigningUp : false,
    isLoggingUp: false,
    isUpdatingProfile: false,
    isCheckingAuth : true,
    checkAuth : async () =>{
        try {
            const res = await axiosInstance.get("/auth/admin/check")
            set({authAdmin : res.data})
        } catch (error) {
            console.log("Error in chekAuth : ", error)
            set({authAdmin : null})
        }finally{
            set({isCheckingAuth:false})
        }
    },
    signup : async (data) =>{
        set({isSigningUp : true})
        try {
            
            const res = await axiosInstance.post("/auth/admin/signup" , data)
            set({authAdmin:res.data})
            toast.success("Account created successfully.")
            
        } catch (error) {
            toast.error(error.response.data.message)   
        }finally{
            set({isSigningUp: false})
        }
    },

    adminLogout: async () =>{
        try {
            await axiosInstance.post("/auth/admin/logout")
            set({authAdmin:null})
            toast.success("Logged out successfully")
                
        } catch (error) {
            toast.error("Something went wrong")
        }    
    },
    login: async(data)=>{
        set({isLoggingUp:true})
        try {
            const res = await axiosInstance.post("/auth/admin/login", data)
            set({authAdmin:res.data})
            toast.success("Logged In Successfully")
            
        } catch (error) {
            console.error("error login: " , error)
            toast.error(error.response.data.message)
        } finally{
            set({isLoggingUp:false})
        }
    },
   
}))