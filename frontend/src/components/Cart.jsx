import React, { useEffect } from 'react'

import { borrowStore } from '../store/useBorrowStore'
import { HandHeart, HandHeartIcon, Loader2 } from 'lucide-react'


const Cart = () => {
  const {takenBooks,myBooks,returnBook,isReturning} = borrowStore()

  useEffect(()=>{
    myBooks(),takenBooks
  },[myBooks,takenBooks])

  const handleReturn = (bookId)=>{
    returnBook(bookId)
  }
  
  return (
    <div className='p-3 space-y-3'>
      <h3 className='pl-3 font-bold'>Books in your hand</h3>
      {takenBooks.length == 0 && (
        <div  className='flex h-[300px] items-center justify-center'>
          <p className='text-xs'> No books in your Hand</p>
        </div>
      )}
      {takenBooks.map((book)=> 

          
      <div key={book._id} className='flex items-center justify-between pb-1 pt-1 pl-3 pr-3 bg-base-100 rounded-lg hover:bg-base-300'>
        <h3>{book.bookName}</h3>
        <div className="flex gap-2 items-center">
        
        


        <button
         disabled={isReturning}
          onClick={()=>handleReturn(book.bookId)}
          className='btn btn-primary bg-primary/65 btn-sm flex gap-2 h-[25px] hover:bg-primary/25'
          
        >

            {isReturning ? (
                <>
                  <Loader2 className='size-5 animate-spin' />
                  returning ...
                </>
              ) : (
                <>
                  <p>Return</p>
                  <HandHeartIcon className='cursor-pointer size-4 text-green-600 font-bold'/>
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

export default Cart
