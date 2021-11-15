import React from 'react'
import Link from 'next/link'
const Later = () => {
    return (
        <Link href='/login'>
           <div className= 'opacity-50 text-white font-bold font-mono cursor-pointer hover:opacity-100 mt-1 mx-auto' >Later?</div> 
        </Link>
    )
}

export default Later
