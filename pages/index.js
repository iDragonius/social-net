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
        <h1 className='text-3xl font-bold text-white p-1'>noFace</h1>
        <div className = ' flex  '>
          {store.isAuth ? <AuthEl type={'home'}/> : <NavEl/>}

        </div>
      </div>
      <div className='container flex justify-center  mt-10  mx-auto'>
          <div className='fixed left-[17px] w-1/5 bg-white shadow-lg' >Start</div>
            <div className=' w-3/5 bg-white shadow-lg' >Middle</div>
            <div className ='fixed right-[12px] w-1/5 shadow-lg bg-white'>End</div>

      </div>


    </div>
  )
}


export default observer(Home)