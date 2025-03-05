import { BookPlus, BookUser, BookX, FileQuestion, Heading1, LayoutDashboard, LibrarySquare, Trash2, Trash2Icon } from 'lucide-react'
import React, { useState } from 'react'
import Cart from '../components/Cart'
import BorrowRequests from '../components/BorrowRequests'
import AvailableBooks from '../components/AvailableBooks'
import AdminWelcome from '../components/AdminWelcome'

const DashboardPage = () => {

  const [task, setTask] = useState(null)
  const render = (task)=>{
    switch (task) {
      case 'cart':
        return <Cart/>
      
      case 'books':
        return <AvailableBooks/>
      default:
        return <AdminWelcome/>
    }
  }
  return (
    <div className='container grid grid-cols-1 w-full sm:flex gap-2 mx-auto px-auto p-4  sm:p-2   pt-[58px]  sm:pt-[58px] min-h-screen '>
      <div className="flex flex-col w-[250px] rounded-2xl bg-base-200 p-2">
        <div className="flex gap-2 p-2 border-b-1 border-primary/20">
            <LayoutDashboard className='size-5 text-primary'/>
            <h2>Dashboard</h2>
        </div>
        <button
          onClick={()=>setTask('cart')}>
            <div className={`flex gap-2 cursor-pointer ${task==='cart'?'border-l-2 border-primary-content bg-base-100' :'hover:bg-base-100'} rounded-xl p-2 mt-2 items-center`}>
            <BookUser className='size-4'/>
            <h3 className='text-sm'>Books On Hand</h3>
        </div>
          </button>
          
          <button
          onClick={()=>setTask('books')}>
            <div className={`flex gap-2 cursor-pointer ${task==='books'?'border-l-2 border-primary-content bg-base-100' :'hover:bg-base-100'} rounded-xl p-2 mt-2 items-center`}>
            <LibrarySquare className='size-4 '/>
            <h3 className='text-sm'>Available Books</h3>
            </div>
          </button>
        
      </div>
      <div className="flex flex-col  w-[calc(100%-150px)] bg-base-200 rounded-2xl">
        {render(task)}

      </div>
    </div>
  )
}

export default DashboardPage
