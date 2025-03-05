import { Book, Home, User, UserCog } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='min-h-screen pt-[68px]'>
      <div className='flex flex-col mt-5 justify-center items-center'>
        
        
        <h1 className='mt-3 font-bold text-2xl'>Welcome To AASTU Library</h1>
      </div>
      <div className='max-h-screen gap-3 grid md:grid-cols-2 mt-20'>
      <div className="flex flex-col gap-2 justify-center items-center group">
        <div className="bg-base-200 rounded-xl p-4 animate-pulse">
          <UserCog className='size-12 '></UserCog>
        </div>
        <Link to="/admin/signup" className='mt-3 '>SignUp as an Admin</Link>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center group">
        <div className="bg-base-200 rounded-xl p-4 animate-pulse">
          <Book className='size-12 '></Book>
        </div>
        <Link to="/user/signup" className='mt-3  '>SignUp as a User</Link>
      </div>
    </div>
    </div>
    
  )
}

export default HomePage
