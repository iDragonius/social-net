import React, {useContext, useRef} from 'react'
import axios from 'axios'
import { observer } from 'mobx-react'
import { Context } from '../../pages/_app'
const UnActived = () => {
    const {store} = useContext(Context)
    const code =useRef()
    const activate = async (e) =>{
        e.preventDefault()
        await axios.get(`/api/activation/${code.current.value.trim()}`)
        .then((response)=>{
                if(response.status ===200){
                    store.isActivated = true
                }
                
            
        }).catch((e)=>console.log(e))
    } 
    return (
        <div className='flex flex-col mx-auto justify-center mt-10 rounded-xl shadow-lg w-full pb-10 pt-7 bg-white '>
            <div className = 'text-3xl font-bold text-white py-4 px-6 shadow-xl mb-5 bg-indigo-700 w-content mx-auto rounded-lg'>Account activation:</div>
                    <div className='flex w-8/12 mb-5  self-center '>
                        <div className = 'font-bold text-xl p-4 bg-indigo-600 text-white rounded-md z-10'>Code</div>
                        <input  ref={code}  type="text" className = 'cursor-auto font-semibold w-full text-xl py-4 px-5 bg-indigo-400 text-white rounded-md outline-none z-0 relative right-3'/>
                        <button onClick={activate} className='font-bold text-xl p-4 bg-indigo-600 text-white rounded-md z-10 relative right-5' >Activate</button>
                    </div>
        </div>
    )
}

export default observer(UnActived)
