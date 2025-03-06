import React, { useState,useEffect } from 'react'
import { bookStore } from '../store/useBookStore'
import { borrowStore } from '../store/useBorrowStore'
import { Loader2, MessageCircleQuestion, MessageCircleQuestionIcon, Trash } from 'lucide-react'

const AvailableBooks = () => {

  const {available,getAvailable} = bookStore()
  const {sendRequest,isSendingRequest} = borrowStore()
  
  useEffect(()=>{
    getAvailable(),available
    
  },[getAvailable,available])
  const handleRequest = (bookId)=>{
    sendRequest(bookId)
    
  }
  

  return (
    <div className='p-3 space-y-3'>
      
      {available.map((book)=> 

        
      <div key={book._id} className='flex items-center justify-between pb-1 pt-1 pl-3 pr-3 bg-base-100 rounded-lg hover:bg-base-300'>
        <h3>{book.bookName}</h3>
        <div className="flex gap-2 items-center">
        <h4 className='text-xs'>By {book.authorName}</h4>
        <button
         disabled={isSendingRequest}
          onClick={()=>handleRequest(book._id)}
          className='btn btn-primary btn-sm flex gap-2 h-[25px] hover:bg-primary/25'
          
        >

            {isSendingRequest ? (
                <>
                  <Loader2 className='size-5 animate-spin' />
                  request being sent ...
                </>
              ) : (
                <>
                  <p>Request</p>
                  <MessageCircleQuestionIcon className='cursor-pointer size-4 text-green-600 font-bold'/>
                </>
              )
              }
          
            
            
        </button>
        
        </div>
        
      </div>
      )}
      

      
      
      
    </div>
  )
}

export default AvailableBooks
