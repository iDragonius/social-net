import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../pages/_app'
import Image from 'next/image'
import Link from 'next/link'
import $api from '../../../http'
import moment from 'moment'
const UserFriends = () => {
    const {store} = useContext(Context)
    const [fr, setFr] = useState([])
    const newUser = (e) =>{
        store.setCurrentUser(store.currentUser+1);
    }   
    useEffect(()=>{
        setFr(store.requested)
    },[])

    const deleteFriend = async (e) =>{
        e.preventDefault()
        await $api.post('/delete-friend',{
            nickname:e.target.parentNode.parentNode.childNodes[0].innerHTML
        })
    }

    const deleteRequest = async (e) =>{
        e.preventDefault()
        // if(e.target.innerHTML === 'Add friend') return

        console.log(e.target);
        // e.target.removeAttribute('onclick')

        // e.target.classList.remove('bg-gray-300')
        // e.target.classList.add('text-white','bg-purple-600')
        // e.target.innerHTML = 'Add friend'
        await $api.post('/delete-request',{
            nickname:e.target.parentNode.parentNode.childNodes[0].innerHTML
        }).then((response)=>{
            console.log(response);
            store.setRequested(response.data.friends.requested)

            setFr(store.requested) 
        })
    }

    const addFriend = async(e) =>{

        e.preventDefault()
        // e.target.classList.add('bg-gray-300')
        // e.target.classList.remove('text-white','bg-purple-600')
        // e.target.innerHTML = 'Request sent'
        
        console.log(e.target);
        await $api.post('/add-friend',{
            nickname:e.target.parentNode.parentNode.childNodes[0].innerHTML,
            friendFrom:moment().format('MM-DD-YYYY-HH-mm-ss')
        }).then((response)=>{
            console.log(response);
            store.setRequested(response.data.user.requested)

            setFr(store.requested)
        })
    }
    return (
        <div className='w-full  '> 
        <div className='flex justify-between mx-5  bg-white py-[6px]  px-2 shadow-sm rounded-md'>
            <div className='text-lg font-semibold py-1'>{store.userProfile.nickname}'s friends</div>
            <div className='flex justify-end cursor-pointer' > 
                <div onClick={()=>store.setProfilePages('MainProfile')} className='font-bold bg-purple-600 w-content px-5 py-1 rounded-md text-white text-lg flex'> <Image src={"/img/back.png"} alt="back" width={25} height={2}  /> Back</div>
            </div>
        </div>
        <div >
            {store.userProfile.nickname === store.userInfo.nickname?
                <div>
                {store.userProfile.friends.map(friend=>(
                    <div key={friend.friend}>
                        {friend.accepted?
                                <div className='mt-5 flex justify-between mx-5  bg-white rounded-md  py-1 px-2'>
                                <div className='py-[6px] font-semibold'>{friend.nickname}</div>
                                <div>

                                    <button onClick={deleteFriend} className=' text-white bg-purple-600 rounded-md px-4 py-[6px] font-semibold'>Delete</button>
                                    <Link   href={`/user/${friend.nickname}`}>
                                        <button onClick={newUser} className=' ml-5 text-white bg-purple-600 py-[6px] rounded-md px-4 font-semibold'>Visit</button>                                
                                    </Link>
                                </div>
                            </div>
                            :
                            <div></div>
                    
                    }

                    </div>

                ))}
                </div>
                :
                <div>
                {store.userFriends.map(friend=>(
                    <div key={friend.friend}>
                        {friend.accepted ? 
                            <div className='mt-5 flex justify-between mx-5  bg-white rounded-md  py-1 px-2'>
                            <div className='py-[6px] font-semibold'>{friend.nickname}</div>
                            {store.userInfo.friends.findIndex(index=>friend.nickname === index.nickname ) === -1 && store.userInfo.nickname !== friend.nickname?
                                <div>
                                        <button onClick={fr.findIndex(index=>index.nickname === friend.nickname)==-1 ? addFriend : deleteRequest} className={fr.findIndex(index=>index.nickname === friend.nickname)==-1 ?  'text-white bg-purple-600 py-[6px] rounded-md px-4 font-semibold ':'bg-gray-300   font-semibold py-[6px] rounded-md px-4 cursor-pointer'}>
                                            {fr.findIndex(index=>index.nickname === friend.nickname)==-1 ? 'Add friend' : 'Request sent'}
                                        </button>
                                        <Link href={`/user/${friend.nickname}`}>
                                            <button  onClick={newUser} className='text-white bg-purple-600 py-[6px] rounded-md px-4 font-semibold ml-5'>Visit</button>
                                        </Link>
                                </div>
                                
                                
                                

                                :
                                <div>
                                    {store.userInfo.nickname === friend.nickname ?
                                        <div></div>
                                        :
                                        <Link  href={`/user/${friend.nickname}`}> 
                                            <button  onClick={newUser} className='text-white bg-purple-600 py-[6px] rounded-md px-4 font-semibold'>Visit</button>
                                        </Link>    
                                
                                }
                                </div>

                            }
                            </div>
                            :
                            <div>

                            </div>
                    
                    }
                </div>
                ))}
                </div>

        
        
        }


        </div>
            
        </div>
    )
}

export default observer(UserFriends)
