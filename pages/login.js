import React, {useContext, useRef, useState, useEffect} from 'react'
import Head from 'next/head'
import Navbar from '../components/navbar/Navbar'
import { useRouter } from 'next/router'
import { Context } from './_app'
import Forget from '../components/Forget'
const login = () => {
    const {store} = useContext(Context)
    const router = useRouter()
    const emailRef =useRef()
    const passwordRef =useRef()
    const [status, setStatus] = useState(true)
    const login = async (e) =>{
      e.preventDefault()

      store.login(emailRef.current.value, passwordRef.current.value) 
              .then(()=>{
                if(store.isAuth ){
                 router.push('/') 
                } else {
                  setStatus(false)
                }
              })
      }
      useEffect( ()=>{
         store.checkAuth().then(()=>{
            if(store.isAuth){
              router.push('/')
              
            }
         })
        
      },[])
      if(store.isLoading){
        return(
          <div className='bg-indigo-800 h-screen flex justify-center items-center' >
              <h1 className = 'text-3xl text-white font-bold'>Loading....</h1>
          </div>
        )
      }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-indigo-800 " >
            <Head>
              <title>Login</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar type = {'registration'} />
            <div onClick={()=>console.log(store.isAuth)} className = {status 
                                  ? 'font-mono text-3xl text-white font-bold' 
                                  : 'font-mono text-3xl text-red-700 font-bold' 
                              }
            >
                      Login
            </div>
            <form  action = '' className = 'flex flex-col '>
              <input 
                type='text' 
                placeholder= 'Email' 
                className = { status 
                              ?  'transition duration-300 px-10 py-5 text-blue-800 placeholder-blue-700 font-bold font-mono text-xl rounded-xl bg-white mb-10 focus:bg-blue-900 focus:text-white outline-none mt-10'
                              : ' transition border-2 border-red-600 duration-300 px-10 py-5 text-red-600 placeholder-red-700  font-bold font-mono text-xl rounded-xl bg-white mb-10   outline-none mt-10'
                            }
                ref={emailRef}
                />
              <input 
                type = 'text' 
                placeholder= 'Password' 
                className = { status 
                              ?  'transition duration-300 px-10 py-5 text-blue-800 placeholder-blue-700 font-bold font-mono text-xl rounded-xl bg-white mb-10 focus:bg-blue-900 focus:text-white outline-none '
                              : ' transition border-2 border-red-600 duration-300 px-10 py-5 text-red-600  placeholder-red-700 font-bold font-mono text-xl rounded-xl bg-white mb-10   outline-none'
                            }
                ref={passwordRef}
               />
              <button onClick = {login} className = 'transition duration-300 px-10 py-5 bg-gray-100 rounded-xl font-semibold font-mono text-2xl focus:bg-blue-900 outline-none text-blue-500 focus:text-white'>
                  Login
              </button>
              <Forget/>
          </form>
          
        </div>
    )
}

export default login
