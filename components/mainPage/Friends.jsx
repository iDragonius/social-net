import React, { useContext, useState, useRef, useEffect } from 'react'
import { Context } from '../../pages/_app'
import Link from 'next/link'
import axios from 'axios'
import $api from '../../http'
import moment from 'moment'
import { observer } from 'mobx-react-lite'
const Friends = ({stat}) => {
    const {store} = useContext(Context)
    const followRef = useRef()

    const [number, setNumber] = useState(0)
    const [status, setStatus] = useState(store.stat)
    useEffect(async ()=>{
      store.setStat("Friends")
      document.body.classList.remove('overflow-y-hidden')

    },[number])
    const deleteFriend = async (e) =>{
      await $api.post('/delete-friend',{
        nickname:e.target.parentNode.parentNode.childNodes[0].innerHTML
      }).then((response)=>{
        store.setFriends(response.data.friends)
        setNumber(()=> number+=1)

      })
    }

    const addFriend = async (e)=>{
      e.preventDefault()
      await $api.post('/add-friend',{
        nickname:followRef.current.value.trim(),
        friendFrom:moment().format('MM-DD-YYYY-HH-mm-ss')
      }).then((response)=>{
        console.log(response);
        store.setFriends(response.data.user.friends)
        followRef.current.value =''
        setNumber(()=> number+=1)
      })
    }
  
    const acceptFriend = async (e) =>{
      await $api.post('/accept-friend',{
        nickname:e.target.parentNode.parentNode.parentNode.childNodes[0].innerHTML
      }).then((response)=>{
        store.setFriends(response.data.friends)
        setNumber(()=> number+=1)

      })
    }
    return (
        <div>
          <div className='bg-white rounded-xl   shadow-lg flex justify-between mb-5 mt-[100px]'>
            <h1 className='text-xl font-bold mt-3 mb-4 ml-5  text-purple-900'>{store.stat==="Friends" ? "Friends" : "Requests"}</h1>
            {store.stat==="Friends"?
              <div className='flex pr-4 py-2'>
                <input type="text" className='font-semibold  outline-none bg-gray-200 rounded-l-md px-2' ref={followRef}  placeholder='Write nickname' />
                <button onClick={addFriend} className='font-bold bg-purple-700 px-5 rounded-r-md text-white' >ADD</button>
            </div>
            :
            <div></div>
          }
            
          </div>
          {store.friends.length>0? store.friends.map((friend,index)=>(
            <div>
              {store.stat === "Friends" ? 
                  <div>
                    {store.friends[index].accepted  ? 
                      <div key={index} className='bg-white rounded-xl   py-3 shadow-lg flex justify-between mb-5'>
                         <div className='pl-5 text-center font-semibold' >
                          {friend.nickname}
                        </div>
                        <div className='pr-5 flex'>
                          <Link href={`/user/${friend.nickname}`}>
                              <div className='bg-purple-600 px-4  text-white font-bold rounded-md shadow-md cursor-pointer'>
                                  Visit
                              </div>
                          </Link>
                          <div onClick={deleteFriend} className='bg-purple-600   px-4  text-white font-bold rounded-md shadow-md cursor-pointer ml-5'>
                                  Delete
                              </div>
                        </div>
                      </div> 
                      : 
                      <div key={index}></div> }
                  </div> 
                  : 
                  <div>
                     {store.friends[index].accepted ? 
                      <div key={index}>

                      </div> 
                      : 
                      <div  key={friend.friend} className='bg-white rounded-xl   py-1 shadow-lg flex justify-between mb-5'>
                          <div className='pl-5 text-center py-2 text-lg font-semibold' >
                            {friend.nickname}
                          </div>
                          <div className='pr-5 flex pt-[10px]'>
                            <div>
                                  <div onClick={acceptFriend} className='unAccepted bg-purple-600  px-4   text-white font-bold rounded-md shadow-md cursor-pointer mr-5'>
                                      Accept
                                  </div> 
                            </div>
                            <Link href={`/user/${friend}`}>
                                <div className='bg-purple-600  px-4 h-content  text-white font-bold rounded-md shadow-md cursor-pointer'>
                                    Visit
                                </div>
                            </Link>
                            <div onClick={deleteFriend} className='bg-purple-600 h-content  px-4   text-white font-bold rounded-md shadow-md cursor-pointer ml-5'>
                                    Delete
                            </div>
                      </div></div> }
                  </div>  }

            </div>
          )):<h1 className='px-5 py-2 bg-white text-purple-700 font-semibold rounded-md'>{store.stat === "Friends" ? 'You dont have friends ' : 'You dont have requests'}:(</h1> }

      </div>
    )
}

export default observer(Friends)
