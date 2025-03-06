import React, { useEffect } from 'react'
import { borrowStore } from '../store/useBorrowStore'
import { CheckSquare } from 'lucide-react'
import { formatTime } from '../lib/utils'

const BorrowRequests = () => {
  const {requests,getRequests,approveRequest,isApproving} = borrowStore()

  useEffect(()=>{
    getRequests(),requests
  },[getRequests,requests])
  if(requests.length == 0){
    return(
      <div className='h-full flex items-center justify-center'>
        <p className='text-primary/40' >No request yet</p>
      </div>
    )
  }
  if (Array.isArray(requests) && requests.length > 0)
  return (
    <div>
      <div className='p-3 space-y-3'>
      
      {requests.map((book)=> 

          
      <div key={book._id} className='flex items-center justify-between pb-1 pt-1 pl-3 pr-3 bg-base-100 rounded-lg hover:bg-base-300'>
        <h3>{book.bookName}</h3>
        <div className="flex gap-2 items-center">
      
        <button
         
          onClick={()=>approveRequest(book.bookId)}
          className='btn btn-primary btn-sm flex gap-2 h-[25px] hover:bg-primary/25'
          disabled={isApproving}
          
        >
           {isApproving? <p>Approving ...</p> : <><p>Approve</p>
            <CheckSquare className='cursor-pointer size-4 text-green-600 font-bold'/></>}
            
            
        </button>
        
        </div>
        
      </div>
      )}
      

      
    
      
    </div>
    </div>
  )
}

export default BorrowRequests
