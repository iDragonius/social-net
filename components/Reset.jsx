import { configure } from 'mobx'
import React, {useRef} from 'react'
import $api from '../http'
const Reset = () => {
    const password = useRef()
    const confirmPassword = useRef()
    const reset = (e) =>{
        e.preventDefault()
        if(password.current.value !== confirmPassword.current.value) return
        $api.post('/reset',{
            password:password.current.value
        })
    }
    return (
        <div className='flex flex-col mx-auto justify-center mt-10 rounded-xl shadow-lg w-full pb-10 pt-7 bg-white '>
                    <div className='flex flex-col w-8/12 mb-5  self-center '>
                        <div className='flex mb-5 mt-10'>
                            <div className = 'w-[300px] font-bold text-xl p-4 bg-indigo-600 text-white rounded-md z-10'>New password</div>
                            <input ref={password}    type="text" className = 'cursor-auto font-semibold w-full text-xl py-4 px-5 bg-indigo-400 text-white rounded-md outline-none z-0 relative right-3'/>
                        </div>
                        <div className='flex mb-5'>
                            <div className = 'w-[300px] font-bold text-xl p-4 bg-indigo-600 text-white rounded-md z-10'>Confirm password</div>
                            <input ref={confirmPassword}   type="text" className = 'cursor-auto font-semibold w-full text-xl py-4 px-5 bg-indigo-400 text-white rounded-md outline-none z-0 relative right-3'/>
                        </div>
                        <button onClick={reset} className='w-max px-20 mx-auto font-bold text-xl py-4 bg-indigo-600 text-white rounded-md z-10 relative right-5' >Reset</button>
                    </div>
        </div>
    )
}

export default Reset
