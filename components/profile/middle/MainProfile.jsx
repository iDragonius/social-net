import React, { useContext, useRef, useState, useEffect } from 'react'
import { Context } from '../../../pages/_app'
import $api from '../../../http'
import moment from 'moment'
import time from '../../../utility/time'
import { observer } from 'mobx-react'

const MainProfile = () => {
    const {store} = useContext(Context)
    const [data, setData] = useState(0)
    const [p, setP] = useState([])
    const content = useRef()
    useEffect(async  () => {
       await $api.post('user-posts',{
            nickname: store.userProfile.nickname
        })
        .then((response)=>{ 
            store.setUserPosts(response.data.posts)
            setP(store.userPosts)    
        
        })
    }, [data])
    const like = async (e) =>{
        if(e.target.src === 'http://localhost:3000/img/likeUn.png'){
            e.target.src = 'http://localhost:3000/img/like.png'
            e.target.parentNode.parentNode.childNodes[0].childNodes[0].innerHTML = parseInt(e.target.parentNode.parentNode.childNodes[0].childNodes[0].innerHTML) + 1
        } else {
            e.target.src = 'http://localhost:3000/img/likeUn.png'
            e.target.parentNode.parentNode.childNodes[0].childNodes[0].innerHTML = parseInt(e.target.parentNode.parentNode.childNodes[0].childNodes[0].innerHTML)  -1

        }
        await $api.post('/like',{
            post:store.userPosts[e.target.parentNode.parentNode.childNodes[1].id]._id
        })
    }
    const create = async (e) =>{
      
        e.preventDefault()
        await $api.post('/post-creating', {
          nickname:store.userInfo.nickname,
          content:content.current.value,
          createdId:moment(),
          createdAt:moment().format('MM-DD-YYYY-HH-mm-ss')
        }).then(response => {
            
            setData(response.data.post.createdId)
            console.log(data);
          content.current.value=''
        })
      }
    return (
        <div className='w-full'>
            <div className ='flex flex-col bg-white px-3 rounded-md'>
                <div className='font-semibold text-xl mt-2 py-2 border-b-2 mb-2 border-gray-200'>{store.userProfile.name && store.userProfile.surname ? `${store.userProfile.name} ${store.userProfile.surname}` : `${store.userProfile.nickname}`}</div>
                <div className='flex justify-between'>
                    <div className='opacity-50'>Gender:</div>
                    <div>{store.userProfile.gender}</div>
                </div>
                <div className='flex justify-between mb-4'>
                    <div  className='opacity-50'>Birthday:</div>
                    <div>{store.userProfile.birthday}</div>
                </div>
            </div>
            <div>
                {store.userProfile.nickname === store.userInfo.nickname?
                    
                    <div className='bg-white rounded-xl   shadow-lg flex flex-col mb-5 mt-5'>
                            <h1 className='text-lg font-semibold py-1 ml-3'>What's new?</h1>
                            <textarea  ref={content} className='w-full px-3  bg-gray-100 outline-none font-semibold pt-2  max-h-[60px] ' name="" id="" cols="30" rows="4"></textarea>
                            <button onClick={create}  className='py-1 rounded-b-md font-bold  text-white bg-purple-700' >Post</button>
                    </div>
    
                    :
                    <div></div>
            
            
            }
            </div>
            <div className='mt-5'>
                {p.map((post,index)=>(
                    <div   key={post.createdId} className=' rounded-lg  shadow-lg flex flex-col mb-4 '>
                    <div className='bg-purple-600 py-1 px-3 rounded-t-lg  font-semibold  text-white cursor-pointer'>
                        {post.nickname}
                        </div> 
                    <div className= 'bg-white py-2 px-3 max-h-[200px] overflow-y-auto break-words' >{post.content.split('\n').map((str,index)=>(
                    <div key={index}>
                        {str}
                    </div>
                    ))}</div>
                    <div className='flex justify-between bg-gray-200 rounded-b-md'>
                    <div className='flex'>
                        <div onClick={()=>(true)} className='flex ml-2 py-2'>
                            <span className=' px-2 z-0  w-3 mr-2  rounded-b-lg text-md opacity-70 font-semibold  hover:opacity-90 cursor-pointer'>{post.likes.likes}</span>
                            <img onClick={like}    src={post.likes.user.indexOf(store.userInfo.user)>-1 ?'http://localhost:3000/img/like.png':'http://localhost:3000/img/likeUn.png'}  alt="Like" width={24} height={24} />
                        </div>
                        <div id={index}  className='flex px-3 z-0  rounded-b-lg text-sm opacity-70 font-semibold mt-[10px] hover:opacity-90 cursor-pointer'>
                            {post.commentNumber} comments
                        </div>
                    </div>
                    <div className=' px-3   rounded-b-lg text-sm opacity-70 font-semibold mt-[10px] ' >{time(post.createdAt)   }</div>

                    </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default observer(MainProfile)
