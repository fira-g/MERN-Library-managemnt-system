import { useState } from 'react'
import { Routes , Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import {Loader} from "lucide-react"
import {Toaster} from "react-hot-toast"
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import { useThemeStore } from './store/useThemeStore.js'
import LoginPage from './pages/LoginPage.jsx'
import AdminSignUpPage from './pages/AdminSignUpPage.jsx'
import AdminLoginPage from "./pages/AdmniLoginPage.jsx"
import DashboardPage from './pages/DashboardPage.jsx'
import UserDashboardPage from './pages/UserDashboardPage.jsx'
import { useAuthAdminStore } from './store/useAuthAdminStore.js'
import { useAuthUserStore } from './store/useAuthUserStore.js'




function App() {

const {theme} = useThemeStore()
const {authAdmin,isCheckingAuth,checkAuth} =useAuthAdminStore()
const {authUser,isCheckingUserAuth,checkUserAuth} =useAuthUserStore()

  useEffect(()=>{
    checkUserAuth(),checkAuth()
  },[checkAuth,checkUserAuth])
  


if((isCheckingUserAuth && !authUser) || (isCheckingAuth && !authAdmin)){
  return(
    <div data-theme={theme} className='flex items-center justify-center h-screen'>
    <Loader className='size-10 animate-spin' />
  </div>
  )
  
  
}
  return (
    <div data-theme = {theme} >
    
    <Navbar/>
   <Routes>
      <Route path="/" element={ <HomePage/>}  />
     <Route path="/user/signup" element={!authUser?<SignUpPage/>:<Navigate to="/user/dashboard"/>}  />
     <Route path="/user/login" element={!authUser?<LoginPage/>:<Navigate to="/user/dashboard"/>}  />

     <Route path="/admin/signup" element={!authAdmin?<AdminSignUpPage/>:<Navigate to="/admin/dashboard"/>}  />
     <Route path="/admin/login" element={ !authAdmin?<AdminLoginPage/>:<Navigate to="/admin/dashboard"/>}  />
     <Route path="/admin/logout" element={<Navigate to="/admin/signup"/>}/>
     <Route path="/admin/dashboard" element={authAdmin?<DashboardPage/>:<Navigate to="/admin/signup"/>}/> 
     <Route path="/user/dashboard" element={authUser?<UserDashboardPage/>:<Navigate to="/user/signup"/>}/>        
     
   </Routes>

   <Toaster />
 </div>
  )
}

export default App
