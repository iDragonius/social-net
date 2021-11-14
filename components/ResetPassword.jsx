import React from 'react'
import Reset from './Reset'
const ResetPassword = () => {
    return (
        <div className='w-full h-screen mt-28 rounded-md ' >
            <div className=' mx-auto flex x p-5 rounded-md  bg-white w-content cursor-auto shadow-lg ' >
                <div className='flex   '>
                    <div className = 'p-5 bg-indigo-700 w-max rounded-md z-10' ><img src="./img/setting.png" alt="User" width='36px' /></div>
                    <h1 className = 'font-bold text-3xl bg-indigo-500 py-5 px-10 rounded-md text-white relative right-2 z-0'>Reset your password </h1>
                </div>
            </div>
            <Reset/>

        </div>
    )
}

export default ResetPassword
