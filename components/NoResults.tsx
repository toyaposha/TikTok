import React from 'react';
import { MdOutlineVideocamOff } from 'react-icons/md';

interface IProps {
  text: string
}

const NoResults = ({text}: IProps) => {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full mt-[100px]'>
      <p className='text-6xl'>
        <MdOutlineVideocamOff/>
      </p>
      <p className='text-2xl text-center'>
        {text}
      </p>
    </div>
  )
}

export default NoResults