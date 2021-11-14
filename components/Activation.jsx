import React, {useRef, useContext } from 'react'
import { Context } from '../pages/_app'
import axios from 'axios'
import { observer } from 'mobx-react'
import UnActived from './activation/UnActived'
import Actived from './activation/Actived'
const Activation = () => {
    const code = useRef()
    const {store} = useContext(Context)
    
    if(store.isActivated === true){
        return(
            <div className='flex flex-col mx-auto justify-center mt-10 rounded-xl shadow-lg w-full pb-10 pt-7 bg-white '>
            <div className = 'text-3xl font-bold text-white py-4 px-6 shadow-xl mb-5 bg-indigo-700 w-content mx-auto rounded-lg'>Account activation:</div>
                    <div className='flex w-full  mb-5  self-center '>
                        <div className = 'font-bold mx-auto text-xl p-4 bg-indigo-600 text-white rounded-md z-10'>Account actived</div>
                        
                    </div>
        </div>
        )
    }
    return (
        <>
            {store.isActivated?<Actived/>:<UnActived/>}
        </>
    )
}

export default observer(Activation)
