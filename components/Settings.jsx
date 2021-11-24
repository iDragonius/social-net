import React, { useContext } from 'react'
import Activation from './Activation'
import { Context } from '../pages/_app'
const Settings = () => {
    const {store} = useContext(Context)
    return (
        <div className='w-full h-screen mt-28 rounded-md ' >
            <div className=' mx-auto flex  p-2 rounded-md  bg-white w-content cursor-auto shadow-lg ' >
                <div className='flex   '>
                    <div className = 'p-3 bg-purple-700 w-max rounded-l-md z-10' ><img src="./img/customer.png" alt="User" width='36px' /></div>
                    <h1 className = 'font-bold text-xl pt-[15px] bg-purple-500 py-3 px-10 rounded-r-md text-white relative right-1 z-0 '>Account activation: </h1>
                </div>
                    
                
            </div>
            <Activation/>
        </div>
    )
}

export default Settings
