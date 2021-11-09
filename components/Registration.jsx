import React, {useState, useRef} from 'react'
import axios  from 'axios'
import moment from 'moment'
const Registration = ({users}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const emailRef =useRef()
    const passwordRef =useRef()
    const [us, setUs] = useState({})
    const fetchUser =async (e) =>{
        e.preventDefault()
        const users = await axios.get(`http://localhost:3000/api/user/${emailRef.current.value}`)
        const user = users.data
        setUs({
            email : user.email,
            password:user.password,
            date:user.createdAt
        })

    }

    return (
        <div>
            <form  action = '' className = 'flex flex-col '>
              <input 
                type='email' 
                placeholder= 'email' 
                className = ' transition duration-300 px-10 py-5 placeholder-white font-bold font-mono text-xl mb-10 rounded-xl bg-red-400 focus:bg-red-900 outline-none'
                ref={emailRef}
                />
              <input 
                type = 'password' 
                placeholder= 'password' 
                className = 'transition duration-300 px-10 py-5 placeholder-white font-bold font-mono text-xl rounded-xl bg-red-400 mb-10 focus:bg-red-900 outline-none'
                ref={passwordRef}
                
               />
              <button onClick={fetchUser} className = 'transition duration-300 px-10 py-5 bg-gray-100 rounded-xl font-semibold font-mono text-3xl focus:bg-red-600 outline-none text-red-500 focus:text-white'>
                  Registration
              </button>
              <div>{us.email}</div>
              <div>{moment(parseInt(us.date)).format("DD MM, YYYY, HH:MM:SS")}</div>
              <div>{us.password}</div>
          </form>
          
        </div>
          
    )
}

export default Registration

