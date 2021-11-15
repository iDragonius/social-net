import React, {useContext, useRef, useEffect} from 'react'
import axios  from 'axios'
import Head from 'next/head'
import Navbar from '../components/navbar/Navbar'
import validator from 'validator'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Context } from './_app'
import { observer } from 'mobx-react-lite'
import Later from '../components/Later'
const activation = () => {
    const {store} = useContext(Context)
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
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-indigo-800    ">
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
                <Later/>
              
              
          </form>
          
        </div>
    )
}

export default observer(activation)
