import React from 'react'
import Link from 'next/link'
const NavEl = () => {
    return (
        <>
            <div className = 'text-blue-900 px-5 py-2 rounded-lg font-bold text-lg bg-white'>
                <Link  href = '/login'>Login</Link>
            </div>
            <div className = 'text-blue-900 px-5 py-2 rounded-lg font-bold text-lg bg-white ml-5'>
                <Link  href = '/registration'>Registration</Link>
            </div>   
        </>
    )
}

export default NavEl
