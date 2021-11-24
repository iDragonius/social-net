import React, {useContext, useRef, useEffect} from 'react'
import axios  from 'axios'
import Head from 'next/head'
import Navbar from '../components/navbar/Navbar'
import validator from 'validator'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Context } from './_app'
import { observer } from 'mobx-react-lite'
import $api from '../http'
const forgot = () => {
    const {store} = useContext(Context)
    const router = useRouter()
    const emailRef = useRef()
    
    useEffect( ()=>{
        store.checkAuth().then(()=>{
           if(store.isAuth){
             router.push('/')
             
           }
        })
       
     },[])

     const forgotPass = async(e) =>{
         e.preventDefault()
        $api.post('/forgot',{
            email:emailRef.current.value
        }).then((response)=>{
            console.log(response.data);
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
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-purple-800    ">
            <Head>
              <title>Forgot password</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className = 'font-mono text-3xl text-white font-bold' >Please write an email from your account</div>
            <form  action = '' className = 'flex flex-col '>
              <input 
                type='text' 
                placeholder= 'Email' 
                className = 'transition duration-300 px-10 py-5 text-purple-800 placeholder-purple-700 font-bold font-mono text-xl rounded-xl bg-white mb-10 focus:bg-purple-900 focus:text-white outline-none mt-10'
                ref={emailRef}
                />
              
                <button onClick={forgotPass} className = 'transition duration-300 px-10 py-5 bg-gray-100 rounded-xl font-semibold font-mono text-2xl focus:bg-purple-900 outline-none text-purple-500 focus:text-white'   >
                    Send mail with link
                </button>
                
              
              
          </form>
          
        </div>
    )
}

export default observer(forgot)
