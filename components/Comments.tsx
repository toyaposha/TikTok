import React, { useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import useAuthStore from '@/store/authStore';
import {IUser} from '@/types';
import NoResults from './NoResults';

interface IProps{
     comments: IComment[];
     isPostingComment:Boolean;
     comment: string;
     setComment: Dispatch<SetStateAction<string>>
     addComment: (e: React.FormEvent) => void

}
interface IComment {
    comment: string;
    length?: number;
    _key: string;
    postedBy: {_ref?: string;_id?: string;}
}

const Comments = ({comments,isPostingComment, comment, setComment, addComment}:IProps) => {
   const{allUsers, userProfile,fetchAllUsers} =  useAuthStore();
   useEffect(()=> {
       fetchAllUsers();
   })
 

  
   
  
  return (
    <div className='border-t-2 border-gray-200 pt-4 px-10 mt-4 bg-[#141619] pb-[100px]'>
            <div className='overflow-scroll lg:h-[600px] element'>{comments?.length > 0 ? (
                comments?.map((item: IComment,index: number)=> (
                    <>
                        {allUsers?.map((user: IUser) => (
                            user._id === (item.postedBy._ref || item.postedBy._id) && (
                                <div className='p-2 items-center' key={index}>
                                    <Link href={`/profile/${user._id}`}>
                                        <div className='flex item-start gap-3'>  
                                          <div className='w-12 h-12'>
                                              <Image
                                               width={48} 
                                               height={48}
                                               className='rounded-full cursor-pointer'
                                               src={user.image}
                                               alt='user'
                                               layout='responcive'

                                              />
                                          </div>
                                          <p className='flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-white'>
                                               {user?.userName}{' '}
                                               <GoVerified className='text-blue-400' />
                                          </p>
                                         </div>
                                    </Link>
                                    <div>
                                        <p className='mt-2 ml-16 text-white text-[16px] mr-8'>
                                             {item.comment}
                                            
                                        </p>

                                        {/* <button className='text-white' onClick={() => deleteComment()} >Delete</button> */}
                                       
                                    </div>
                                </div>
                            )
                        )) }
                    </>
                    
                ))
                
            ) : (
                <NoResults text='No Comments yet! Be First to add the comment' />
            )}</div>
        <div className='absolute bottom-0 l-0 pb-6 px-2 md:px-10'>
        <form className='flex gap-4' onSubmit={addComment}>
           <input
           value={comment}
           onChange={(e) => setComment(e.target.value)}
              className='bg-[#141619] px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[600px] lg:w-[350px] border-gray-100 rounded-lg focus:outline-none focus:border-2 focus:border-gray-300 text-white'
              placeholder='Add comment ...'

           />
           <button className='text-md text-gray-400' onClick={addComment}>Send</button>
        </form>
        </div>
        
    </div>
  )
}

export default Comments