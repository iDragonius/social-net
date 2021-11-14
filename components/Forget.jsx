import React from 'react'
import Link from 'next/link'
const Forget = () => {
    return (
        <Link href='/forgot'>
           <div className= 'opacity-50 text-white font-bold font-mono cursor-pointer hover:opacity-100 mt-1 mx-auto' >Forgot password?</div> 
        </Link>
    )
}

export default Forget
