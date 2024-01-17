import React, { useEffect } from 'react'
import { useState } from 'react'
import { MdFavorite } from 'react-icons/md'
import { NextPage } from 'next'
import useAuthStore from '@/store/authStore'

interface IProps{
    likes: any;
    handleLike: () => void;
    handleDislike: () => void;
}

const LikeButton: NextPage <IProps> = ({likes, handleLike,handleDislike}) => {
    const [alreadyLiked, setAlreadyLiked] = useState(false);

    const {userProfile}: any =useAuthStore();

  const filterLikes = likes ?.filter((item:any)=> item._ref ===userProfile?._id)
  useEffect(()=> {
    if(filterLikes?.length>0) {
        setAlreadyLiked(true);
    } else {
        setAlreadyLiked(false)
    }
  },[filterLikes, likes])
  return (
    <div className='text-white flex gap-6'>
        <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
           {
            alreadyLiked ? (
                <div className='bg-transparent rounded-full p-2  md:p-4 text-[#f51997]' onClick={handleDislike}>
                    <MdFavorite className='text-lg md:text-3xl' />
                </div>
            ): (
                <div className='bg-transparent rounded-full p-2 md:p-4 '  onClick={handleLike}>
                      <MdFavorite className='text-lg md:text-3xl' />
                </div>
            )
           }
           <p className='text-md font-semibold' >{likes?.length || 0} </p>
        </div>
    </div>
  )
}

export default LikeButton