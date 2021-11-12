import React, { useRef} from 'react'
import axios  from 'axios'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import validator from 'validator'
import Link from 'next/link'
import { useRouter } from 'next/router'
const activation = () => {
    const router = useRouter()
    const activationRef = useRef()
    const activate = async (e) =>{
        e.preventDefault()
        await axios.get(`/api/activation/${activationRef.current.value.trim()}`)
                    .then((response)=>{
                        if(response.status === 200){
                            router.push('/login')
                        }
                    }).catch((e)=>console.log(e))
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-blue-500 ">
            <Head>
              <title>Activation</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className = 'font-mono text-3xl text-white font-bold' >Activation</div>
            <form  action = '' className = 'flex flex-col '>
              <input 
                type='text' 
                placeholder= 'Code' 
                className = 'transition duration-300 px-10 py-5 text-blue-800 placeholder-blue-700 font-bold font-mono text-xl rounded-xl bg-white mb-10 focus:bg-blue-900 focus:text-white outline-none mt-10'
                ref={activationRef}
                />
              
                <button onClick={activate} className = 'transition duration-300 px-10 py-5 bg-gray-100 rounded-xl font-semibold font-mono text-2xl focus:bg-blue-900 outline-none text-blue-500 focus:text-white'   >
                    Activate account
                </button>
                
              
              
          </form>
          
        </div>
    )
}

export default activation
