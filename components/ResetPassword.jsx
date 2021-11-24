import React from 'react'
import Reset from './Reset'
const ResetPassword = () => {
    return (
        <div className='w-full h-screen mt-28 rounded-md ' >
            <div className=' mx-auto flex x p-2 rounded-md  bg-white w-content cursor-auto shadow-lg ' >
                <div className='flex   '>
                    <div className = 'p-3 bg-purple-700 w-max rounded-md z-10' ><img src="./img/rotation-lock.png" alt="User" width='36px' /></div>
                    <h1 className = 'font-bold text-xl bg-purple-500 py-3 px-10 rounded-md text-white relative right-2 pt-[15px] z-0'>Reset your password </h1>
                </div>
            </div>
            <Reset/>

        </div>
    )
}

export default ResetPassword
