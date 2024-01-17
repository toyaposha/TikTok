import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { MdDelete, MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import axios from 'axios';
import { useRouter } from 'next/router';
import { video } from '@/types';
import LikeButton from '@/components/LikeButton';
import useAuthStore from '@/store/authStore';
import Comments from '@/components/Comments';
import { FaComment } from "react-icons/fa6";

interface IProps {
    postDetails: video
}

const Detail = ({ postDetails } : IProps) => {
    const [post, setPost] = useState(postDetails);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const[isPostingComment, setIsPostingComment] =useState <boolean>(false);
    const [comment, setComment] = useState<string>('');
    const [isActive, setIsActive] = useState(false)
    

    const videoRef = useRef<HTMLVideoElement>(null)
    
    const router = useRouter();
    const { userProfile } : any = useAuthStore();

    const onVideoClick = () => {
        if (isPlaying) {
            videoRef?.current?.pause();
            setIsPlaying(false);
        } else {
            videoRef?.current?.play();
            setIsPlaying(true);
        }
    };
    const handleLike = async (like: boolean) => {
        if(userProfile) {
            const res = await axios.put('http://localhost:3000/api/like', {
                userId: userProfile._id,
                postId: post._id,
                like
            });
            setPost({...post, likes: res.data.likes});
        }
    }
    const addComment = async (e:{ preventDefault: () => void})=>{
         e.preventDefault();
         if(userProfile){
            if(comment){
                setIsPostingComment(true);
                const res = await axios.put(`http://localhost:3000/api/post/${post._id}`, {
                    userId: userProfile._id,
                    comment
                });
                 setPost({...post, comments: res.data.comments});
                 setComment('');
                 setIsPostingComment(false)
            }
         }
    }
    
    const deletePost = async () => {
        if((userProfile._id === post.postedBy._id)) {
            const res = await axios.delete(`http://localhost:3000/api/post/${post._id}`)
        }
        router.back();
    }
   
    const activeClass = !isActive ? 'relative flex-2 w-[1000px] lg:w-full flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center' : 'relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center'
    const notActiveClass = isActive ? 'relative w-[1000px] md:w-[900px] lg:w-[700px] ' : 'hidden relative '
 
  return (
    <>
    {
        post&& (
            <div className='flex w-full absolute left-0 top-0 bg-black flex-wrap lg:flex-nowrap'>
            <div className= { `${activeClass}`}>
                <div className='opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50'> 
                <p className='cursor-pointer' onClick={()=> router.back()}>
                       <MdOutlineCancel className='text-white text-[35px] hover:opacity-90' />
                </p>
                </div>
                 <div className='relative'>
                      <div className='lg:h-[100vh] h-[60vh] '>
                           <video
                            ref={videoRef}
                            src={post.video.asset.url} className='h-full cursor-pointer' 
                            onClick={onVideoClick}>
                                
                           </video>
                      </div>
                 </div>
                 <div className='absolute top-[45%] left-[47%] cursor-pointer'>
                    {
                        !isPlaying && (
                            <button onClick={onVideoClick}>
                            <BsFillPlayFill className='text-white text-6xl lg: text8xl'/>
                            </button>
                        )
                    }
                      
                 </div>
                 <div className='absolute bottom-5 top-0  lg:bottom-10 right-5 lg:right-10 cursor-pointer lg:mt-[200px] col-5 '>
                    <div className='mr-2 md:mr-2'>{
                    userProfile && 
                    <LikeButton 
                    likes={post.likes}
                    handleLike={() => handleLike(true)}
                    handleDislike={() => handleLike(false)} />
                  } </div>
                    <div className='ml-[20px] mt-[50px]'>
                    {
                        !isMuted ? ( <button onClick={()=>setIsMuted(true)}>
                        <HiVolumeOff className='text-white text-3xl lg:text-3xl' />
                     </button>):( 
                          <button  onClick={()=>setIsMuted(false)}>
                        <HiVolumeUp className='text-white text-4xl lg:text-5xl' />
                         </button>)

                    }
                    </div>
                    
                            <div className=' ml-[22px] mt-[50px]'>
                            <button onClick={()=>setIsActive(true)}><FaComment  className='text-white text-2xl lg:text-2xl'/></button>
                        </div>
                       
                    
                       
                    
                    { 
                         userProfile?._id === post?.postedBy._id && (
                              <div className='ml-[20px] mt-[50px]  '>
                              <button onClick={()=>deletePost()} >
                             <MdDelete className='text-white text-2xl lg:text-4xl' />
                             </button>
                               </div>
                        )
                     
                    }
                    
                  
                    
                    
                 </div>
            </div>
             <div className={`${notActiveClass}`}> 
                <div className='mt-10'>
                <Link href={`/profile/${post?.postedBy._id}`}>
                    <div className='flex gap-4 mb-4 bg-black w-full pl-10 cursor-pointer'>
                    <Image src={post.postedBy?.image} width={60} height={60} alt='' className='rounded-full card__photo'/>
                   <div>
                   <div className='text-xl font-bold text-white lowercase flex gap-2 items-center justify-center'>
                     {post.postedBy?.userName.replace(/\s+/g, '')}{''}
                     <GoVerified className='text-blue-400 text-xl' />
                 </div>
                 <p className='text-md text-white'>
                  {post.postedBy?.userName}
                 </p>
                   </div>

                    </div>
                   
                 </Link>
                  <div className='px-10'>
                        <p className='text-md text-gray-400 '>
                            {post.caption}
                        </p>
                  </div>
                   <div className='mt-10 px-10'>
                   
                   </div>
                   <Comments 
                      comment={comment}
                      setComment={setComment}
                      addComment={addComment}
                      comments={post.comments}
                      isPostingComment={isPostingComment}
                   />
                    
                </div>
                
                
             </div>
         </div>
        )
    }
    
    </>
  )
 }
 
 
 export const getServerSideProps = async ({
     params: { id },
 } : {
     params: { id: string };
 }) => {
     const { data } = await axios.get(`http://localhost:3000/api/post/${id}`);
 
     return {
         props: { postDetails: data }
     };
 };
 
 export default Detail