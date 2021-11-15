import React, { useContext } from 'react'
import { Context } from './_app'
const profile = () => {
    const {store} = useContext(Context)
    return (
        <div>
            {store.user.email}
            {store.userInfo.nickname}
        </div>
    )
}

export default profile
