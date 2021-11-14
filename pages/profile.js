import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { Context } from './_app'
import AuthEl from '../components/AuthEl'
import NavEl from '../components/NavEl'
import { observer } from 'mobx-react-lite'
import About from '../components/About'
import Settings from '../components/Settings'
import ResetPassword from '../components/ResetPassword'
const profile = () => {
    const {store} = useContext(Context)
    const [sections, setSections]  = useState('About')
    
    useEffect(() => {
        if(localStorage.getItem('token')){
          store.checkAuth()
          
        }
      }, [])
 
    if(store.isLoading){
    return(
        <div className='bg-indigo-800 h-screen flex justify-center items-center' >
            <h1 className = 'text-3xl text-white font-bold'>Loading....</h1>
        </div>
    )
    }
    const section = (e)=>{
        const section = document.getElementById('section').childNodes
        for(let i = 0;i<section.length;i++){
            if(section[i].innerHTML === e.target.innerHTML){
                setSections(section[i].innerHTML)
                section[i].classList.add('bg-indigo-700')
                section[i].classList.add('text-white')
                section[i].classList.add('font-bold')
                console.log(sections);
            }else{
                section[i].classList.remove('bg-indigo-700')
                section[i].classList.remove('text-white')
                section[i].classList.remove('font-bold')
            }

        }

    }
    return (
        <div className=" bg-gray-300" >
            <Head>
              <title>Profile</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <div  className = 'fixed w-full flex justify-end p-3 bg-indigo-800  shadow-xl z-50'>
                {store.isAuth ? <AuthEl type = {'profile'}/> : <NavEl/>}

            </div>
            
            <div className=' h-min container mx-auto grid grid-cols-5 gap-10 '>
                <div  className='fixed w-40 top-28    h-content rounded-md bg-white text-center col-span-1' id='section' >
                    <div onClick={section} className='transition-all duration-300 py-5 font-semibold border-b-2 border-b-gray-200  cursor-pointer bg-indigo-700 text-white font-bold rounded-md' >About</div>
                    <div onClick={section} className='transition-all duration-300 py-5 border-b-2 border-b-gray-200 font-semibold cursor-pointer rounded-md'>Settings</div>
                    <div onClick={section} className='transition-all duration-300 py-5 font-semibold cursor-pointer rounded-md'>Reset password</div>
                </div>
                
                <div className=' w-full  rounded-md  text-center col-span-4 flex flex-col align-center relative left-64 ' >
                    {sections==='About'? <About/> :''}
                    {sections==='Settings'? <Settings/> :''}
                    {sections==='Reset password'? <ResetPassword/> :''}
                
                </div>
            </div>
            
          
        </div>
    )
}

export default observer(profile)
