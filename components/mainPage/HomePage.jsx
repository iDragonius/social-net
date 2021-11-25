import { observer } from 'mobx-react-lite'
import moment, { min } from 'moment'
import React, {useContext, useEffect, useRef, useState} from 'react'
import $api from '../../http'
import { API_URL } from '../../http'
import {Context} from '../../pages/_app'
import Link from 'next/link'
import HomePageComments from './rightBar/HomePageComments'
import time from '../../utility/time'
const HomePage = () => {
  const content = useRef()
    const {store} = useContext(Context)
    const [data, setData] = useState(0)
    const create = async (e) =>{
      console.log(API_URL );
      e.preventDefault()
      await $api.post(`/post-creating`, {
        nickname:store.userInfo.nickname,
        content:content.current.value,
        createdId:moment(),
        createdAt:moment().format('MM-DD-YYYY-HH-mm-ss')
      }).then(response => {
        setData(data+1)
        content.current.value=''
      })
    }
    useEffect(async ()=>{
      await $api.get('/posts').then((response)=>{
        store.setPosts(response.data.posts)
        console.log(response);
      })
    },[data])
    const viewComment = (e)=>{
      store.setPost(e.target.id)
      store.setCommentView(true)
      e.target.parentNode.parentNode.parentNode.classList.add('fixed','top-20', 'w-1/2', 'ml-8' )
      e.target.parentNode.parentNode.parentNode.classList.add('z-20')

      document.getElementById(`i${e.target.id}`).classList.remove('hidden')

      document.getElementById('back').classList.remove("hidden")
      document.body.classList.add('overflow-y-hidden') 
    }
    const comm = (e)=>{
      document.getElementById(store.post).parentNode.parentNode.parentNode.classList.remove('relative')
      store.setCommentView(false)
      document.getElementById(store.post).parentNode.parentNode.parentNode.classList.remove('fixed')
      document.getElementById(store.post).parentNode.parentNode.parentNode.classList.remove('top-40')
      document.getElementById(store.post).parentNode.parentNode.parentNode.classList.remove('w-1/2')
      document.getElementById(store.post).parentNode.parentNode.parentNode.classList.remove('ml-8')
      document.getElementById(`i${store.post}`).classList.add('hidden')
      

        e.target.classList.add('hidden')
      document.body.classList.remove('overflow-y-hidden')
    }

    const like = async (e) =>{
      if(e.target.src === 'http://localhost:3000/img/likeUn.png'){
        e.target.src = 'http://localhost:3000/img/like.png'
        e.target.parentNode.parentNode.childNodes[0].childNodes[0].innerHTML = parseInt(e.target.parentNode.parentNode.childNodes[0].childNodes[0].innerHTML) + 1
      } else {
        e.target.src = 'http://localhost:3000/img/likeUn.png'
        e.target.parentNode.parentNode.childNodes[0].childNodes[0].innerHTML = parseInt(e.target.parentNode.parentNode.childNodes[0].childNodes[0].innerHTML)  -1

      }
      await $api.post('/like',{
        post:store.posts[e.target.parentNode.parentNode.childNodes[1].id]._id
      })
    }
    

  return (
    <div> 
          <div id='back' onClick={comm} className='hidden fixed left-0 right-0 top-0 bottom-0   bg-black bg-opacity-70 h-full z-10   '></div>
          
            
          <div className='bg-white rounded-xl   shadow-lg flex flex-col mb-5 mt-[100px]'>
                <h1 className='text-xl font-semibold py-1 ml-3 '>Tell people how your day went</h1>
                <textarea  ref={content} className='w-full px-3  bg-gray-100 outline-none font-semibold pt-2 text-lg max-h-[130px] ' name="" id="" cols="30" rows="4"></textarea>
                <button onClick={create}  className='py-1 rounded-b-md font-bold text-lg text-white bg-purple-700' >Post</button>
          </div>
          {store.posts.map((post,index)=>(
            <div   key={post.createdId} className=' rounded-lg  shadow-lg flex flex-col mb-4 '>
                <Link href={`/user/${post.nickname}`} >
                  <div className='bg-purple-600 py-1 px-3 rounded-t-lg  font-semibold  text-white cursor-pointer'>
                    {post.nickname}
                    </div> 
                  </Link>
                <div className= 'bg-white py-2 px-3 max-h-[200px] overflow-y-auto break-words' >{post.content.split('\n').map((str,index)=>(
                  <div key={index}>
                    {str}
                  </div>
                ))}</div>
                <div className='flex justify-between bg-gray-200 rounded-b-md'>
                  <div className='flex'>
                      <div onClick={()=>(true)} className='flex ml-2 py-2'>
                        <span className=' px-2 z-0  w-3 mr-2  rounded-b-lg text-md opacity-70 font-semibold  hover:opacity-90 cursor-pointer'>{post.likes.likes}</span>
                        <img  onClick={like}  src={post.likes.user.indexOf(store.userInfo.user)>-1 ?'./img/like.png':'./img/likeUn.png'}  alt="Like" width={24} height={24} />
                      </div>
                      <div id={index} onClick={viewComment} className='flex px-3 z-0  rounded-b-lg text-sm opacity-70 font-semibold mt-[10px] hover:opacity-90 cursor-pointer'>
                         {post.commentNumber} comments
                      </div>
                  </div>
                  <div className=' px-3   rounded-b-lg text-sm opacity-70 font-semibold mt-[10px] ' >{time(post.createdAt)   }</div>

                </div>
                <div id={`i${index}`} className='hidden mt-10'><HomePageComments/></div> 

            </div>
          ))}

        </div>
  )
}

export default observer(HomePage)










