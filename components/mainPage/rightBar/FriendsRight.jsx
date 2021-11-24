import { observer } from 'mobx-react'
import React, { useContext, useState } from 'react'
import { Context } from '../../../pages/_app'
const FriendsRight = () => {
    const [status, setStatus] = useState('')
    const {store} = useContext(Context)

   
    return (
        <div className='flex justify-center  rounded-lg'>
            <select onChange={(e)=>store.setStat(e.target.value)} className='w-full text-white bg-purple-600  rounded-lg px-5 text-lg font-bold  py-2 mt-[6px] outline-none' name="friend" id="123">
                <option className='font-semibold text-white bg-purple-600 ' value="Friends">Friends</option>
                <option className='font-semibold text-white bg-purple-600'>Requests</option>
            </select>
        </div>
    )
}

export default observer(FriendsRight)
