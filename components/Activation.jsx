import React, {useRef, useContext } from 'react'
import { Context } from '../pages/_app'
import axios from 'axios'
import { observer } from 'mobx-react'
import UnActived from './activation/UnActived'
import Actived from './activation/Actived'
import SendRertyMail from './SendRertyMail'

const Activation = () => {
    const code = useRef()
    const {store} = useContext(Context)
    
    if(store.isActivated === true){
        return(
            <div className='flex flex-col mx-auto justify-center mt-10 rounded-xl shadow-lg w-full  pt-5 bg-white '>
          
                    <div className='flex w-full  mb-5  self-center '>
                        <div className = 'font-bold mx-auto text-xl p-2 bg-purple-600 text-white rounded-md z-10'>Account actived</div>
                        
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
