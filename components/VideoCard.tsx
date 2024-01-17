import React from 'react';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {HiVolumeUp, HiVolumeOff} from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import {GoVerified} from 'react-icons/go';
import { BsPlay } from 'react-icons/bs';
import {video} from '@/types'
import { NextPage } from 'next';
import useAuthStore from '@/store/authStore';

interface IProps {
    post: video;
    isShowingAtHome?: boolean;
} 

const VideoCard: NextPage <IProps> = ({post: {caption, postedBy, video, _id, likes}, isShowingAtHome}) => {
    const [playing, setPlaying] = useState(false);
    const [isHover, setisHover] = useState(false)
    const [isVideoMuted, setIsVideoMuted]=useState(false)
    const { userProfile } : any = useAuthStore();
    const videoRef= useRef<HTMLVideoElement>(null);
    
    const onVideoPress=() => {
        if(playing) {
            videoRef?.current?.pause();
            setPlaying(false);

        } else {
            videoRef?.current?.play();
            setPlaying(true)
        }
    }

    if(videoRef?.current){
        videoRef.current.muted = isVideoMuted;
    }
    
   
    if(!isShowingAtHome){
        return (
            <div>
                <Link href=''>
                    <video loop src={video.asset.url} className='w-[200px] md:w-full rounded-xl '>

                    </video>
                </Link>
                <div className='flex gap-2 mt-8 items-center ml-4 '>
                     <p className='text-white text-lg fpnt-medium flex gap-1 items-center'>
                           <BsPlay className='text-2xl' />
                           {likes?.length || 0}
                     </p>
                </div>
                <Link href={'/'}>
                    <p className='mt-5 text-md text-gray-800 cursor-pointer w-200'> {caption}</p>
                </Link>
            </div>
        )
    }
    
    
  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
        <div className='flex '>
            <div className='md:w-16 md:h-16 w-10 h-10'>
            <Link href={`/profile/${postedBy?._id}`}>
                <Image src={postedBy?.image} width={62} height={62} alt='' className='rounded-full  card__photo'/>
              
            </Link>
            </div>
            <div>
            <Link href={`/profile/${postedBy?._id}`}>
                <div className='flex items-center gap-2'> 
                   <p className='flex gap-2 items-center md:text-md font-bold text-primery ml-2 mt-2 '>
                    {postedBy?.userName}
                       <GoVerified className='text-blue-300 text-' />
                       
                   </p>
                </div>
            </Link>
            </div>
             </div>
        <div className='relative lg:ml-20  flex gap-4 md:pr-4 pr-2'>
            <div onMouseEnter={()=>setisHover(true)}
                 onMouseLeave={()=>setisHover(false)}
                 className='rounded-3xl' >
            <Link href={`/detail/${_id}`}>
            <video loop ref={videoRef} src={video.asset.url} className=' relative z-1  md:w-full rounded-xl cursor-pointer'>
                   
            </video>
        </Link>
        
          {
              isHover && (
            <div className='relative'>       
        <div className='absolute z-2 ml-[7px] flex flex-gap  bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex xl:gap-[350px]  w-[100px] md:w-[50px]  p-3'>
        {
            playing ? (
                <button onClick={onVideoPress}>
                    <BsFillPauseFill className='text-white text-2xl lg: text-5xl' />
                </button>
            ) :
            <button onClick={onVideoPress}>
            <BsFillPlayFill  className='text-white text-2xl lg: text-5xl'/>
             </button>

        }
       {
        isVideoMuted ? (
            <button onClick={()=>setIsVideoMuted(false)}><HiVolumeOff className='text-white text-2xl lg: text-4xl'/></button>
        ): (
            <button onClick={()=>setIsVideoMuted(true)}><HiVolumeUp className='text-white text-2xl lg: text-4xl'/></button>
        )
       }
       
      
    </div>
    </div>  
              )
          }  
        
        
            </div>
        </div>
       
    </div>
  ) 
}

export default VideoCard