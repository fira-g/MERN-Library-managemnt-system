import { BookPlus, BookX, FileQuestion, Heading1, LayoutDashboard, LibrarySquare, Trash2, Trash2Icon } from 'lucide-react'
import React, { useState } from 'react'
import AddBook from '../components/AddBook'
import DeleteBook from '../components/DeleteBook'
import BorrowRequests from '../components/BorrowRequests'
import AvailableBooks from '../components/AvailableBooks'
import AdminWelcome from '../components/AdminWelcome'

const DashboardPage = () => {

  const [task, setTask] = useState(null)
  const [showFull, setShowFull] = useState(false)
  const render = (task)=>{
    switch (task) {
      case 'add':
        return <AddBook/>
      case 'remove':
        return <DeleteBook/>
      case 'requests':
        return <BorrowRequests/>
      
      default:
        return <AdminWelcome/>
    }
  }
  return (
    <div className='container grid grid-cols-1  w-full sm:flex gap-2 mx-auto px-auto p-4  sm:p-2   pt-[58px]  sm:pt-[58px] min-h-screen '>
      <div className="flex flex-col w-[250px] rounded-2xl bg-base-200 p-2">
        <div className="flex gap-2 p-2 justify-between border-b-1 border-primary/20">
          <div className=" flex gap-2">
            <LayoutDashboard className='size-5 text-primary'/>
            <h2>Dashboard</h2>
          </div>
          
            
        </div>
        <button
          onClick={()=>setTask('add')}>
            <div className={`flex gap-2 cursor-pointer ${task==='add'?'border-l-2 border-green-600 bg-base-100' :'hover:bg-base-100'} rounded-xl p-2 mt-2 items-center`}>
            <BookPlus className='size-4 text-green-600'/>
            <h3 className='text-sm'>Add Book</h3>
        </div>
          </button>
          <button
          onClick={()=>setTask('remove')}>
            <div className={`flex gap-2 cursor-pointer ${task==='remove'?'border-l-2 border-red-700 bg-base-100' :'hover:bg-base-100'} rounded-xl p-2 mt-2 items-center`}>
            <Trash2 className='size-4 text-red-700'/>
            <h3 className='text-sm'>Delete Book</h3>
            </div>
          </button>
          <button
          onClick={()=>setTask('requests')}>
            <div className={`flex gap-2 cursor-pointer ${task==='requests'?'border-l-2 border-primary-content bg-base-100' :'hover:bg-base-100'} rounded-xl p-2 mt-2 items-center`}>
            <FileQuestion className='size-4'/>
            <h3 className='text-sm'>Borrow Requests</h3>
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
