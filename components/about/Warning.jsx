import React from 'react'

const Warning = ({days}) => {
    return (
        <div className='w-8/12 mx-auto mb-3' >
            
            <h1 className='font-bold text-red-600 text-lg'>You can't change the information about yourself that you filled out at least 90 days ago</h1>
            <h1 className='font-bold text-red-600  text-lg'>Only the fields that were not filled in earlier will change</h1>
            <div>
                <h1 className='font-bold text-white text-lg px-3 py-2 rounded-md bg-red-600 w-content mx-auto'>{days} days left</h1>
                
            </div>
        </div>
    )
}

export default Warning
