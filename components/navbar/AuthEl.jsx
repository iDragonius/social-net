import React, { useContext } from 'react'
import {useRouter} from 'next/router'
import { Context } from '../../pages/_app'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
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
       { type === 'home'?
                <div className='flex cursor-pointer'>
                    <Link href='/profile'>
                        <div className='py-3 bg-gray-200 px-6 rounded-lg z-0 relative left-7 font-semibold text-indigo-700 text-base' >{store.userInfo.nickname?store.userInfo.nickname:store.user.email} </div>
                    </Link>
                    <Link href='/profile'>
                        <div  className = 'text-blue-900 px-4 py-3 rounded-lg font-bold text-lg z-10 bg-white ml-4 cursor-pointer' >
                                <img src="./img/user.png" alt="logout" width='25px' />
                        </div>
                    </Link>

                    <Link href='/settings'>
                        <div  className = 'text-blue-900 px-4 py-3 rounded-lg font-bold text-lg z-10 bg-white ml-4 cursor-pointer' >
                                <img src="./img/setting.png" alt="logout" width='25px' />
                        </div>
                    </Link>
                    
                </div>
                :
                <div className='flex cursor-pointer'>
                    <Link href='/profile'>
                        <div className='py-3 bg-gray-200 px-6 rounded-lg z-0 relative left-7 font-semibold text-indigo-700 text-base' >{store.userInfo.nickname?store.userInfo.nickname:store.user.email} </div>
                    </Link>
                    <Link href='/profile'>
                        <div  className = 'text-blue-900 px-4 py-3 rounded-lg font-bold text-lg z-10 bg-white ml-4 cursor-pointer' >
                                <img src="./img/user.png" alt="logout" width='25px' />
                        </div>
                    </Link>
                    <Link href='/'>
                        <div  className = 'text-blue-900 px-4 py-3 rounded-lg font-bold text-lg bg-white ml-4 cursor-pointer' >
                            <img src="./img/home.png" alt="logout" width='25px' />
                        </div>
                    </Link>
                </div>
                
        }
        
        <button onClick={logout} className = 'text-blue-900 px-4 py-3 rounded-lg font-bold text-lg bg-white ml-4'><img src="./img/logout.png" alt="logout" width='25px' /></button>
        </>
    )
}

export default observer(AuthEl)
