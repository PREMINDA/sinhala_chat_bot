
import { PostCommment } from '@/interfaces/models';
import React, { useState } from 'react'



export default function CommentInput({onCommentPost}:PostCommment) {
  const[userInput,setUserInput] = useState<string>('');
  const onPostSubmit = () =>{
    onCommentPost(userInput);
  }
  return (
   
   <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
       <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
           <label className="sr-only">Your comment</label>
           <textarea onChange={(e)=>{setUserInput(e.target.value)}} id="comment"  className="focus:outline-none w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
       </div>
       <div className="flex justify-end items-center px-3 py-2 border-t dark:border-gray-600">
           <button onClick={()=>onPostSubmit()} className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800">
               Post comment
           </button>
       </div>
   </div>

  )
}
