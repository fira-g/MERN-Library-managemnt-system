import { Trash2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { bookStore } from '../store/useBookStore'

const DeleteBook = () => {
  
  const {remove,books,getBooks} = bookStore()
  useEffect(()=>{
    getBooks()
    
  },[getBooks])
  const handleDelete = (bookId)=>{
    remove(bookId)
    
  }
  return (
    <div className='p-3 space-y-3'>
      <h3 className='pl-3 font-bold'>Books in the Store</h3>
      {books.map((book)=> 

          
      <div key={book._id} className='flex items-center justify-between pb-1 pt-1 pl-3 pr-3 bg-base-100 rounded-lg hover:bg-base-300'>
        <h3>{book.bookName}</h3>
        <div className="flex gap-2 items-center">
        <h4 className='text-sm'>{book.authorName}</h4>
        <button
          type='submit'
          onClick={()=>handleDelete(book._id)}
          
        >
            <Trash2Icon className='cursor-pointer text-red-500 size-4'/>
        </button>
        
        </div>
        
      </div>
      )}
      

      
      
      
    </div>
  )
}

export default DeleteBook
