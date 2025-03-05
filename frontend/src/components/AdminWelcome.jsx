import { BookOpenText } from 'lucide-react'
import React from 'react'

const AdminWelcome = () => {
  return (
    <div className='flex flex-col gap-3 h-full items-center mt-[50px]'>
      <div className="p-2 bg-base-100 animate-bounce rounded-xl">
        <BookOpenText className='size-8 text-primary' />
      </div>
      <div className='flex flex-col gap-1 items-center'>
      <h1 className='text-xl font-bold'>Welcome Admin!</h1>
      <h1 className='text-lg font-semibold '>You can start doing your tasks!</h1>
      </div>
      
    </div>
  )
}

export default AdminWelcome
