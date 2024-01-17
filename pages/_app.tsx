import {useState, useEffect } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

const App =({ Component, pageProps }: AppProps)=> {
   ///управление процессом рендоринга
    const[isSSR, setIsSSR] = useState(true);

    useEffect(()=> {
        setIsSSR(false)
    },[]);
    if(isSSR) return null


     return (
        <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
      <div className='m-auto h-[100vh] xl:w-[1200px]'>
        <Navbar/>
        <div className='flex gap-6 md:gap-20'>
            <div className='h-[92vh] overflow-auto xl:overflow-auto element'>    
                <Sidebar/>
            </div>
            <div className='mt-4 flex flex-col gap-10 h-[88vh] overflow-auto videos flex-1 element'>
            <Component {...pageProps} />
            </div>
        </div>
          
      </div>
      </GoogleOAuthProvider>
       
     )
}

export default App;