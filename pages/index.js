import React, {useEffect, useState} from 'react'
import Head from 'next/head'  
import Link from 'next/link'
import {API_URL} from '../http/index'
import axios from 'axios'
import AuthEl from '../components/AuthEl'
import NavEl from '../components/NavEl'
import moment from 'moment'
export default function Home() {
  const [isAuth, setIsAuth] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(async () =>{
    setIsLoading(true)
    try {
        await axios.get(`${API_URL}/refresh`, {withCredentials: true})
          .then((response)=>{
              setUserInfo(response.data)
              window.localStorage.setItem('token', response.data.accessToken);

          })
        setIsAuth(true);
    } catch (e) {
        console.log(e);
    }finally{
        setIsLoading(false)
        console.log(userInfo);
    }

  },[])
  if(isLoading){
    return(
      <div className='bg-blue-600 h-screen flex justify-center items-center' >
          <h1 className = 'text-3xl text-white font-bold'>Loading....</h1>
      </div>
    )
  }
  return (
    <div className="  h-screen">
      <Head>
        <title>Next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className = 'flex justify-end p-3 bg-blue-500 '>
        {isAuth ? <AuthEl/> : <NavEl/>}

      </div>
      {isAuth? <div> { moment(parseInt(userInfo.userInfo.createdAt)).format('MM DD YYYY, HH:MM:SS')} </div> : <div>bye</div>}
      {isAuth? <div>hi {userInfo.userInfo.email} </div> : <div>bye</div>}
      
    </div>
  )
}


