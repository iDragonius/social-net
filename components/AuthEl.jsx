import React from 'react'
import $api from '../http'
import {useRouter} from 'next/router'
const AuthEl = () => {
    const router = useRouter()
    const logout = async (e) =>{
        e.preventDefault()
        await $api.post('/logout')
            .then((response)=>{
                console.log(response);
                router.push('/login')
            })
    }
    return (
        <button onClick={logout} className = 'text-blue-900 px-5 py-2 rounded-lg font-bold text-lg bg-white ml-5'>Logout</button>
    )
}

export default AuthEl
