import React, {useRef} from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import axios from 'axios'
import $api from '../http/index'
import { useRouter } from 'next/router'
const login = () => {
    const router = useRouter()
    const emailRef =useRef()
    const passwordRef =useRef()
    const login = async (e) =>{
      e.preventDefault()

      await $api.post('/login',{
          email:emailRef.current.value,
          password:passwordRef.current.value
      })
          .then((response)=>{

              router.push('/')
            
            console.log(response);
            window.localStorage.setItem('token', response.data.accessToken)
          })
          .catch(function (error) {
              console.log(error);
          });
  }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-blue-500 " >
            <Head>
              <title>Login</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar type = {'registration'} />
            <div className ='font-mono text-3xl text-white font-bold '>Login</div>
            <form  action = '' className = 'flex flex-col '>
              <input 
                type='text' 
                placeholder= 'Email' 
                className = ' transition duration-300 px-10 py-5 text-blue-800 placeholder-blue-700 font-bold font-mono text-xl mb-10 rounded-xl bg-white focus:bg-blue-900  focus:text-white outline-none mt-10'
                ref={emailRef}
                />
              <input 
                type = 'text' 
                placeholder= 'Password' 
                className = 'transition duration-300 px-10 py-5 text-blue-800 placeholder-blue-700 font-bold font-mono text-xl rounded-xl bg-white mb-10 focus:bg-blue-900 focus:text-white outline-none'
                ref={passwordRef}
                
               />
              <button onClick = {login} className = 'transition duration-300 px-10 py-5 bg-gray-100 rounded-xl font-semibold font-mono text-2xl focus:bg-blue-900 outline-none text-blue-500 focus:text-white'>
                  Login
              </button>
              
          </form>
          
        </div>
    )
}

export default login
