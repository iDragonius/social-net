import React from 'react'
import Link from 'next/link'
const Navbar = ({type}) => {
    return (
        <div className= 'absolute right-0 top-0 flex flex-col w-36  mt-7 bg-white mr-10 text-center rounded-xl' >
            <div className = ' font-bold text-blue-400 border-b-2 py-3'>
                <Link href = '/'>Home</Link>
            </div>
            <div className = 'font-bold py-3 text-blue-400  '>
                <Link href = {'/'+ type}>{type[0].toUpperCase() + type.slice(1)}</Link>
            </div>
        </div>

    )
}
export default Navbar
