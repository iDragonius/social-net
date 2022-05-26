import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { Context } from './_app'
import AuthEl from '../components/navbar/AuthEl'
import NavEl from '../components/navbar/NavEl'
import { observer } from 'mobx-react-lite'
import About from '../components/About'
import Settings from '../components/Settings'
import ResetPassword from '../components/ResetPassword'
import {useRouter} from 'next/router'
import Link from 'next/link'
const profile = () => {
    const {store} = useContext(Context)
    const [sections, setSections]  = useState('About')
    const router = useRouter()
    useEffect(() => {
        store.setProfilePages("MainProfile")
        if(localStorage.getItem('token')){
          store.checkAuth()
          
        }else{
            router.push('/')
        }
      }, [])
 
    if(store.isLoading){
    return(
        <div className='bg-purple-700 h-screen flex justify-center items-center' >
            <img src='./img/loader.jpg' alt='loader' />
        </div>
    )
    }
    const section = (e)=>{
        const section = document.getElementById('section').childNodes
        for(let i = 0;i<section.length;i++){
            if(section[i].innerHTML === e.target.innerHTML){
                setSections(section[i].innerHTML)
                section[i].classList.add('bg-purple-700')
                section[i].classList.add('text-white')
                section[i].classList.add('font-bold')
            }else{
                section[i].classList.remove('bg-purple-700')
                section[i].classList.remove('text-white')
                section[i].classList.remove('font-bold')
            }

        }

    }
    return (
        <div className=" bg-gray-300" >
            <Head>
              <title>Profile</title>
              <link rel="icon" href="/hand-shake.png" width='24px'/>

            </Head>
            <div className='fixed w-full flex justify-between py-1 bg-white  shadow-xl px-3 z-50'>
            <Link href='/'>
                <img src='./img/letsmeet2.png' className='ml-4' alt='logo' width='170px'/>
            
            </Link>
                <div className = ' flex  '>
                {store.isAuth ? <AuthEl type = {'settings'}/> : <NavEl/>}
                
                </div>
            </div>
            <div className=' h-min container mx-auto grid grid-cols-5 gap-10  '>
                <div  className='fixed w-40 top-28    h-content rounded-md bg-white text-center col-span-1' id='section' >
                    <div onClick={section} className='transition-all duration-300 py-3 font-semibold border-b-2 border-b-gray-200  cursor-pointer bg-purple-700 text-white font-bold rounded-md' >About</div>
                    <div onClick={section} className='transition-all duration-300 py-3 border-b-2 border-b-gray-200 font-semibold cursor-pointer rounded-md'>Account activation</div>
                    <div onClick={section} className='transition-all duration-300 py-3 font-semibold cursor-pointer rounded-md'>Reset password</div>
                </div>
                
                <div className=' w-full  rounded-md  text-center col-span-4 flex flex-col align-center relative left-64 ' >
                    {sections==='About'? <About/> :''}
                    {sections==='Account activation'? <Settings/> :''}
                    {sections==='Reset password'? <ResetPassword/> :''}
                
                </div>
            </div>
            
          
        </div>
    )
}

export default observer(profile)
