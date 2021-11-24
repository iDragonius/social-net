import React, { useContext , useEffect, useState} from 'react'
import Link from 'next/link'
import { Context } from '../../pages/_app'
import { observer } from 'mobx-react-lite'
import $api  from '../../http'
import moment from 'moment'
const UserInfo = () => {
    const {store} = useContext(Context)
    const [col, setColor] = useState('bg-purple-600')
    const [data, setData] = useState(0)
    const[stat,setStat] = useState(false)
    useEffect(()=>{
        randomizer()
        setStat(store.userInfo?.requested?.findIndex(index=>index.nickname === store.userProfile.nickname)>-1)

    },[data])
    const addFriend = async(e)=>{
        e.preventDefault()
        await $api.post('/add-friend',{
            nickname:store.userProfile.nickname,
            friendFrom:moment().format('MM-DD-YYYY-HH-mm-ss')
        }).then((response)=>{
            store.setUserFriends(response.data.friend.friends)
            store.setFriends(response.data.user.friends)
            store.setUserProfile(response.data.friend)
            setStat(stat? false : true)
        })
  }
  const deleteRequest = async(e) =>{
    e.preventDefault()
    await $api.post('/delete-request',{
        nickname:store.userProfile.nickname,
    }).then((response)=>{
        store.setUserFriends(response.data.friend.friends)
        store.setFriends(response.data.friends.friends)
        store.setUserProfile(response.data.friend)
        setStat(stat? false : true)


    })
  }
  const randomizer = () =>{
      const colors =[
          'bg-red-600',
          'bg-purple-600',
          'bg-blue-600',
          'bg-indigo-600',
          'bg-pink-600',
          'bg-green-600'
      ]
      const color = colors[Math.floor(Math.random()*(colors.length))]
      setColor(color)
  }
    return (
        <div>
            <div className='w-full px-3  rounded-md  flex bg-white  flex-col justify-center '>
                        <div className={`text-center  py-12 px-[68px] mb-2 w-content ${col} font-bold text-3xl mx-auto mt-2  text-white `}>
                            {store.userProfile.nickname? store.userProfile.nickname[0] : 'A' }
                        </div>
                        <div className='text-lg px-1 font-bold '>
                            {store.userProfile.nickname}
                        </div>
                       
                    </div>
                    {store.userProfile.nickname !== store.userInfo.nickname?
                        <div>
                            {store.userProfile?.friends?.findIndex(index=>index.nickname===store.userInfo?.nickname && index.accepted  )>-1?
                                <div  className='bg-white w-full mt-4 font-semibold py-1  text-center rounded-md flex '>
                                    <img src='http://localhost:3000/img/friendsIn.png' className='mx-3' alt="logout"  height='16px' width='24px'/>
                                    <div>You're friends</div> 
                                </div>   
                                :
                                <div onClick={stat?deleteRequest:addFriend} className={stat?'bg-gray-300 w-full mt-4 font-semibold py-1 rounded-md pl-4 cursor-pointer' : ' cursor-pointer bg-white w-full mt-4 font-semibold py-1 rounded-md flex cursor-pointer'}>
                                   {stat?<div></div>:<img src='http://localhost:3000/img/friendsAdd.png' className='mx-3' height='16px' width='24px'/>} 
                                    <div>{stat?'Request sent':'Add friend'}</div>
                                </div>    

                        
                        
                        }


                        </div>    
                        :
                        <div></div>
                
                
                
                
                }
                    <div onClick={()=>store.setProfilePages('Friends')} className='bg-white w-full mt-4 font-semibold py-1 rounded-md flex cursor-pointer'>
                        <div className='ml-4'>Friends <span className='ml-3 opacity-50'>{store.userProfile.friendsNumber? store.userProfile.friendsNumber : 0 }</span></div> 
                        
                    </div>
        </div>
    )
}

export default observer(UserInfo)




// {store.userProfile.nickname !== store.userInfo.nickname?
//     <div>
//         {stat ?
                
//                     <div>
//                         { store.friendStatus ?
//                             <button onClick={deleteRequest} className='bg-gray-300 w-full mt-4 font-semibold py-1 rounded-md'>
//                                 Request sent
//                             </button>  
//                             :

//                     }
//                     </div>
//                     :


    
    
    
//     }

//     </div>
//     :
//     <div></div>
// }