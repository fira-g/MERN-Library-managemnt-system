import React, { useState } from 'react'
import { useAuthUserStore} from '../store/useAuthUserStore.js'
import { BookOpenTextIcon, EyeIcon, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import {Toaster,toast} from 'react-hot-toast'

const SignUpPage = () => {
  const [showPassword , setShowPassword] = useState(false)
  const [formData , setFormData] = useState({
    fullName:"",
    email:"",
    password:"",
  })

  const {signup , isSigningUp} = useAuthUserStore()
  
  const validateForm = () =>{
    //to check it is entered
    if(!formData.fullName.trim())  return toast.error("Full name is required")
    if(!formData.email.trim()) return toast.error("Email is required")
    if(!/\S+@\S+\.\S+/.test(formData.email)) return("Invalid email format")
    if(!formData.password.trim()) return toast.error("Password is required")
    if(formData.password.length<6) return toast.error("Password must be atleast 6 charachters")
    
    return true;
  }
  const handleSubmit = (e) =>{
    e.preventDefault()

    const success = validateForm()
    if(success === true) signup(formData)
  }

  return (
    <div className='min-h-screen grid lg:grid-cols-1 mt-5'>
      {/*leftSide*/}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-5'>
          {/*LOGO*/}

          <div className='text-center mb-6'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors animate-pulse'>
              <BookOpenTextIcon className='size-6 text-primary '/>
              </div>
              <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
              <p className='text-base-content/60'>Access Our Library for Free!</p>
            </div>

          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='form-control'>
              <label className="label">
                <span className='label-text font-medium'>Full Name</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center  pointer-events-none'>
                  <User className='size-5 text-base-content/40 z-10' />
                </div>
                <input 
                type="text"
                className={`input input-bordered  w-full  pl-10 focus:outline-0`}
                placeholder='Abebe Kebede' 
                value = {formData.fullName}
                onChange={(e) => setFormData({...formData, fullName:e.target.value})}
                 />
              </div>
            </div>
            <div className="form-control">
              <label  className="label">
                <span className='label-text font-medium'>Email</span>
              </label>
              <div className="relative">
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='size-5 text-base-content/40 z-10' />
                </div>
                <input 
                type="email"
                className='input input-border w-full pl-10 focus:outline-0'
                placeholder='example@gmail.com'
                value = {formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                 />
              </div>
            </div>
            <div className="form-control">
              <label  className="label">
                <span className='label-text font-medium'>Password</span>
              </label>
              <div className="relative flex">
                <div className="absolute inset-y-0 left-0  pl-3 flex items-center pointer-events-none">
                  <Lock className='size-5 text-base-content/40 z-10'/>
                </div>
                
               
               <input 
                  type={showPassword ? "text" : "password"}
                  className=' input input-bordered w-full pl-10 focus:outline-0'
                  placeholder='*********' 
                  value = {formData.password}
                  onChange={(e) => setFormData({...formData, password:e.target.value})}
                  />
                  <button
                    type='button'
                    className='absolute pr-3 right-0 inset-y-0   items-center'
                    onClick={()=>setShowPassword(!(showPassword))}>

                  {showPassword ?
                    (<EyeOff className='size-5 text-base-content/40' />)  : (
                    <EyeIcon className='size-5 text-base-content/40' />)}
                    
                  </button>
                  
              </div>
            </div>
            <button type='submit' className='btn btn-primary w-full ' disabled= {isSigningUp}>
              { isSigningUp ? (
                <>
                  <Loader2 className='size-5 animate-spin' />
                  Loading....
                </>
              ) : (
                "Create Account"
              )
              }
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60" >Already have an account? {" "}
            <Link to="/user/login" className='link link-primary'>Sign in</Link>
            </p>
            
          </div>

        </div>
      </div>
    </div>
  )
}

export default SignUpPage
