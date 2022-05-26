import React, { useContext , useEffect, useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Context } from '../_app'
import NavEl from '../../components/navbar/NavEl'
import AuthEl from '../../components/navbar/AuthEl'
import { observer } from 'mobx-react-lite'
import $api from '../../http'
import moment from 'moment'
import UserFriends from '../../components/profile/middle/UserFriends'
import MainProfile from '../../components/profile/middle/MainProfile'
import UserInfo from '../../components/profile/UserInfo'
const UserProfile = () => {
    const {store} = useContext(Context)
    
    useEffect(async () => {
        store.setProfilePages('MainProfile')
        document.body.classList.remove('overflow-y-hidden')
        await store.checkAuth()
      }, [])

    useEffect( async () => {
       await  store.getUser(location.href.substring(location.href.lastIndexOf('/')).slice(1))




    }, [store.currentUser])
      if(store.isLoading){
        return(
            <div className='bg-purple-700 h-screen flex justify-center items-center' >
                <img src='http://localhost:3000/img/loader.jpg' alt='loader' />
            </div>
        )
      }

    return (
        <div className='bg-gray-200 h-full  min-h-screen'>
            <Head>
                <title>{store.userProfile.nickname}</title>
                <link rel="icon" href="/hand-shake.png" width='24px'/>

            </Head>
            <div className='fixed w-full flex justify-between p-1 bg-white  shadow-md px-3 z-50'>
            <Link href='/'>
             <img src='http://localhost:3000/img/letsmeet2.png' className='ml-4 cursor-pointer' alt='logo' width='170px'/>
            
            </Link>
                <div className = ' flex  '>
                {store.isAuth ? <AuthEl type = {'profile'}/> : <NavEl/>}
                
                </div>
            </div>
            <div className='container  flex justify-center mx-auto   '>
                <div className=' mt-[100px] grid grid-cols-12 w-full gap-20  ' >
                    <div className='col-span-2 '>
                        <UserInfo/>
                    
                    </div>       
                    <div className='col-span-7'>
                        {store.profilePages==='Friends'?<UserFriends/>:<div></div>}
                        {store.profilePages==='MainProfile'?<MainProfile/>:<div></div>}
                    </div>       
                    <div className='col-span-3  '>

                    </div>       
                </div>
            </div>
        </div>
    )
}

export default  observer(UserProfile)
