import React, {useContext, useEffect, useState} from 'react'
import Head from 'next/head'  
import Link from 'next/link'
import {API_URL} from '../http/index'
import axios from 'axios'
import AuthEl from '../components/AuthEl'
import NavEl from '../components/NavEl'
import moment from 'moment'
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
    <div className="  h-screen bg-gray-300">
      <Head>
        <title>Next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className = 'flex justify-end p-3 bg-indigo-800  shadow-xl '>
        {store.isAuth ? <AuthEl type={'home'}/> : <NavEl/>}

      </div>
      {store.isAuth? <div>Welcome,  {store.user.email} </div> : <div>bye</div>}
      { store.isAuth? <div>{moment(parseInt(store.user.createdAt)).format('DD MM, YYYY, HH:MM:SS')} </div> : <div>bye</div>}
      {store.isAuth ?<button onClick = {getUsers}>Get user</button> : ''}
      <div>
        {siteUsers.map(user=>(
          <div key={user._id} >{user.email}</div>
        ))}
      </div>
    </div>
  )
}


export default observer(Home)