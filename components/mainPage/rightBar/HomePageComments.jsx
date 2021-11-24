import { observer } from 'mobx-react-lite'
import React, { useContext, useRef,useEffect, useState } from 'react'
import { Context } from '../../../pages/_app'
import moment from 'moment'
import $api from '../../../http'
import Link from 'next/link'
import time from '../../../utility/time'
const HomePageRight = () => {
    const {store} = useContext(Context)
    const content = useRef()

    const [commentID, setCommentID] = useState([])
    const [nickname, setNickname] = useState([])
    const [createdAt, setCreatedAt] = useState([])
    const [comments, setComments] = useState([])
    useEffect(async ()=>{
      setCommentID(store.posts[store.post]?.comments?.createdId);
      setNickname(store.posts[store.post]?.comments?.nickname);
      setCreatedAt(store.posts[store.post]?.comments?.createdAt)
      setComments(store.posts[store.post]?.comments?.comment)
    },[store.post])


    const addComment= async (e) =>{
        e.preventDefault()
        if(content.current.value.trim()==='') return
        await $api.post('/add-comment', {
            nickname:store.userInfo.nickname,
            user:store.userInfo.user,
            comment:content.current.value.trim(),
            createdId:moment(),
            createdAt:moment().format('MM-DD-YYYY-HH-mm-ss'),
            post:store.posts[store.post]._id
          }).then(response => {
            const curr = store.post
            store.setPosts(response.data.posts)
            store.setPost(response.data.posts.length-1===store.post ? 0 : response.data.posts.length-1)
            for (let i = 0; i < response.data.posts.length; i++) {
                if(response.data.posts[i]._id === store.posts[curr]._id){
                    store.setPost(i)
                }
            }
            content.current.value=''
          })
    }


    return (
        <div className='bg-purple-400 rounded-lg ' >
            <div   className='bg-white rounded-md text-lg font-semibold px-3 py-2 '>Comments</div>
            <div className='flex justify-center'>
              <input type="text" ref={content} className=' w-[83.4%] mt-4 text-lg font-semibold shadow-md rounded-l-md py-1 outline-none px-2 h-content ' placeholder='Write comment' />
              <button onClick={addComment} className=' w-[15%] mt-4 text-lg bg-purple-600 shadow-md rounded-r-md py-1 outline-none px-2 font-semibold text-white mb-5  '>Send</button>
            </div>
           
            <div  className='overflow-y-auto max-h-[520px] px-2' id='comments'>
 
                {store.isAuth? store.posts[store.post].comments.map((comment,index)=>(
                    <div key={index} className='bg-white mb-4 rounded-md flex flex-col'>
                        <Link href={`/user/${comment.nickname}`}>
                            <div className="cursor-pointer  text-purple-700 pt-1 w-full font-bold rounded-t-md px-2 ">{comment.nickname}</div>
                        </Link>
                        <div className='pb-1 px-2 max-h-[150px] overflow-y-auto break-words'>{comment.comment}</div>
                        <div className='flex bg-gray-200  px-2  justify-end rounded-b-md'>
                            <div className=' opacity-70 text-sm  font-semibold  '>{time(comment.createdAt)}</div>

                        </div>
                    </div>
                )): <div></div>}
            </div>
          </div>  
        
        
            
    )
}

export default observer(HomePageRight)
