import { footerList1, footerList2,footerList3} from '@/utils/constants'
import Link from 'next/link'
import React from 'react'
import { NextPage } from 'next'


const List=({items,marg} : {items: string[],marg: boolean}) =>
(
    <div className={`flex flex-wrap gap-2 ${marg &&'mt-5'} `}>
    {
       items.map((item,i)=>(
            <Link href='' key={i}>
                <p className='text-grey-400 text-sm hover:underline'>
                   {item}
                 </p>
             </Link>
        
       ))
    }
   
 </div>
)


const Footer: NextPage = () => {
  return (
    <div className='mt-6 hidden xl:block'>
         <List items={footerList1} marg={false}/>
         <List items={footerList2} marg/>
         <List items={footerList3} marg/>
         <p className='text-grey-400 text-sm mt-5 '>©2023 TikTik</p>
       
    </div>
  )
}

export default Footer