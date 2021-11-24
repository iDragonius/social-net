import React, {useRef} from 'react'
import Head from 'next/head'
import $api from '../../http'
const ResetLink = () => {
    const password = useRef()
    const confirmPassword =useRef()
    const save = (e) =>{
        e.preventDefault()
        if(password.current.value !== confirmPassword.current.value) return;
        if(password.current.value.length==0)return;
        let link = location.href.substring(location.href.lastIndexOf('/')).slice(1)
        if(link.at(-1)==='?'){
            link = link.slice(0,-1)
        }
        $api.post('/newpass', {
            password:password.current.value,
            link:link
        }).then((response)=>console.log(response))
    } 

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-purple-800    ">
            <Head>
              <title>Forgot password</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <div  className = 'font-mono text-3xl text-white font-bold' >Enter a new password</div>
            <form  action = '' className = 'flex flex-col '>
              <input 
                type='text' 
                placeholder= 'New password' 
                className = 'transition duration-300 px-10 py-5 text-purple-800 placeholder-purple-700 font-bold font-mono text-xl rounded-xl bg-white mb-6 focus:bg-purple-900 focus:text-white outline-none mt-10'
                ref={password}
                />
              <input 
                type='text' 
                placeholder= 'Confirm password' 
                className = 'transition duration-300 px-10 py-5 text-purple-800 placeholder-purple-700 font-bold font-mono text-xl rounded-xl bg-white mb-5 focus:bg-purple-900 focus:text-white outline-none '
                ref={confirmPassword}
                />
              
                <button onClick={save} className = 'transition duration-300 px-10 py-5 bg-gray-100 rounded-xl font-semibold font-mono text-2xl focus:bg-purple-900 outline-none text-purple-500 focus:text-white'   >
                    Save password
                </button>
                
              
              
          </form>
          
        </div>
    )
}

export default ResetLink
