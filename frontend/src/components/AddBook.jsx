import React, { useState } from 'react'
import { bookStore } from '../store/useBookStore'

const AddBook = () => {
  const {add, isAdding} = bookStore()
  const [formData , setFormData] = useState({
    bookName:"",
    bookCategory:"",
    authorName:""
  })

  const handleSubmit = (e)=>{
    e.preventDefault()
    add(formData)
  }
  return (
    <div className='grid items-center justify-center p-3'>
      <div className="flex flex-col gap-2  ">
        <h1 className='font-bold text-xl'>Insert the Book info below</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-1'>
          <label htmlFor="" className='label'>Book Name</label>
          <input 
            type="text" 
            className='input mt-1 focus:outline-0 h-9'
            value={formData.bookName}
            onChange={(e)=>setFormData({...formData , bookName:e.target.value})}
            />

          

          <label htmlFor="" className='label'>Author's Full Name</label>
          <input 
            type="text" 
            className='input mt-1 focus:outline-0 h-9'
            value={formData.authorName}
            onChange={(e)=>setFormData({...formData , authorName:e.target.value})}
            />
          <label htmlFor="" className='label'>Category</label>
          <select className="select select-primary w-full max-w-xs" 
              value={formData.bookCategory}
              onChange={(e)=>setFormData({...formData , bookCategory:e.target.value})}
              >
            <option disabled selected>category</option>
            <option>Fiction</option>
            <option>Acedemic</option>
            <option>History</option>
            <option>Other</option>
          </select>
          

          <button 
            type='submit'
            className='btn btn-primary w-full h-9 mt-6'
            disabled = {isAdding}
          >
              {!isAdding? 'Add':"loading ..."}
          </button>
        </form>
        
      </div>
    </div>
  )
}

export default AddBook
