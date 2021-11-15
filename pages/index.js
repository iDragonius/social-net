import React, {useContext, useEffect, useState} from 'react'
import Head from 'next/head'  
import Link from 'next/link'
import AuthEl from '../components/navbar/AuthEl'
import NavEl from '../components/navbar/NavEl'
import { Context } from './_app'
import { observer } from 'mobx-react-lite'
import $api from '../http/index'

const  Home=()=> {
  const [siteUsers, setSiteUsers] = useState([])
  const  {store} = useContext(Context)
  useEffect(() => {
    if(localStorage.getItem('token')){
      store.checkAuth()
      
    }
  }, [])
  const getUsers = async (e)=>{
    e.preventDefault()
    await $api.get('/users',{withCredentials:true})
        .then((response)=>{
          console.log(response);
          setSiteUsers(response.data)
        })
  }
  if(store.isLoading){
    return(
      <div className='bg-indigo-800 h-screen flex justify-center items-center' >
          <h1 className = 'text-3xl text-white font-bold'>Loading....</h1>
      </div>
    )
  }
  return (
    <div className="h-screen bg-gray-300">
      <Head>
        <title>noFace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex justify-between p-3 bg-indigo-800  shadow-lg px-3'>
        <Link href='/'>
          <div className='text-3xl font-bold text-white p-1  cursor-pointer flex ml-3'><img src='./img/face-id.png' width={40} height={40}/><span className='ml-3' >noFace</span> </div>
        
        </Link>
        <div className = ' flex  '>
          {store.isAuth ? <AuthEl type={'home'}/> : <NavEl/>}

        </div>
      </div>
      <div className='container flex justify-center  mt-5  mx-auto'>
          <div className=' fixed left-[17px] w-2/12  ' >
            <div className='transition-all duration-200 flex  hover:bg-gray-900 hover:bg-opacity-20 hover:shadow-lg rounded-lg p-3 cursor-pointer'>
                <img src='./img/home.png' width={36} height={36}/>
                <span className='ml-3 font-semibold  mt-1'>Home page</span>
            </div>
            <div className='transition-all duration-200 flex  hover:bg-gray-900 hover:bg-opacity-20 hover:shadow-lg rounded-lg p-3 cursor-pointer'>
                <img src='./img/friends.png' width={36} height={36}/>
                <span className='ml-3 font-semibold  mt-1' >Friends</span>
            </div>
            
          </div>
            <div className=' w-8/12 bg-white shadow-lg' >Middle</div>
            <div className ='fixed right-[12px] w-1/5 shadow-lg bg-white'>End</div>

      </div>


    </div>
  )
}


export default observer(Home)