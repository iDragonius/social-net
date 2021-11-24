import React, { useContext } from 'react'
import { Context } from '../pages/_app'

const SendRertyMail = () => {
    const {store} = useContext(Context)
    return (
        <div >
            <h1 >If you havent recieve mail, click the button below</h1>

        </div>
    )
}

export default SendRertyMail
