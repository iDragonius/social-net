import React, { useContext } from 'react'
import {useRouter} from 'next/router'
import { Context } from '../../pages/_app'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import Settings from './types/Settings'
import Home from './types/Home'
import Profile from './types/Profile'
const AuthEl = ({type}) => {
    const router = useRouter()
    const {store} = useContext(Context)
    const logout = async (e) =>{
        e.preventDefault()
        store.logout()
            .then(()=>router.push('/login'))
    }
    
    return (
        <>
        {type === 'home'?<Home/> : <div></div>}
        {type=== 'settings'? <Settings/> : <div></div>}
        {type=== 'profile'? <Profile/> : <div></div>}
        <button onClick={logout} className = 'text-blue-900 px-4 py-3 rounded-lg font-bold text-lg bg-purple-700 ml-4'><img src="http://localhost:3000/img/logout.png" alt="logout" width='25px' /></button>
        </>
    )
}

export default observer(AuthEl)
