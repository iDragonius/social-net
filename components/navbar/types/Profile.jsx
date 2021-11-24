import React, { useContext } from 'react'
import { Context } from '../../../pages/_app'
import Link from 'next/link'
const Settings = () => {
    const {store} = useContext(Context)
    return (
        <div className='flex cursor-pointer'>
                    
                    <Link href='/'>
                        <div  className = 'text-blue-900 px-4 py-3 rounded-lg font-bold text-lg bg-purple-700 ml-4 cursor-pointer' >
                            <img src="http://localhost:3000/img/home.png" alt="logout" width='25px' />
                        </div>
                    </Link>
                    <Link href='/settings'>
                        <div  className = 'text-blue-900 px-4 py-3 rounded-lg font-bold text-lg z-10 bg-purple-700 ml-4 cursor-pointer' >
                                <img src="http://localhost:3000/img/setting.png" alt="logout" width='25px' />
                        </div>
                    </Link>
                </div>
    )
}

export default Settings
