import React, {useContext, useEffect, useState} from 'react'
import Head from 'next/head'  
import Link from 'next/link'
import AuthEl from '../components/navbar/AuthEl'
import NavEl from '../components/navbar/NavEl'
import { Context } from './_app'
import { observer } from 'mobx-react-lite'
import $api from '../http/index'
import HomePage from '../components/mainPage/HomePage'
import Friends from '../components/mainPage/Friends'
import FriendsRight from '../components/mainPage/rightBar/FriendsRight'
const  Home=()=> {
  const [siteUsers, setSiteUsers] = useState([])
  const [section, setSection]= useState('Home')
  const  {store} = useContext(Context)
  const [index, setIndex] = useState(true)
  useEffect(() => {
    document.body.classList.remove('overflow-y-hidden')
    store.setCommentView(false)
    store.setProfilePages("MainProfile")
    if(localStorage.getItem('token')){
      store.checkAuth()
      
    }
  }, [])
  const getFriends = async ()=>{
    setSection('Friends')
    await $api.get('/get-friends').then(response=>{
      store.setFriends(response.data.user.friends)
    })
  }
  if(store.isLoading){
    return(
      <div className='bg-purple-700 h-screen flex justify-center items-center' >
          <img src='./img/loader.jpg' alt='loader' />
      </div>
    )
  }
  return (
    <div  className={ "h-full  min-h-screen  bg-gray-300"}   >
      <Head>
        <title>Letsmeet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='fixed w-full flex justify-between p-1 bg-white  shadow-md px-3 z-50'>
            <Link href='/'>
                <img src='./img/letsmeet2.png' className='ml-4 cursor-pointer' alt='logo' width='170px'/>
            </Link>
                <div className = ' flex  '>
                {store.isAuth ? <AuthEl type = {'home'}/> : <NavEl/>}
                
                </div>
            </div>
      <div className='container  flex justify-center    mx-auto'>
          <div className=' fixed left-[17px] w-2/12 mt-[100px] ' >
            <div onClick={()=>setSection('Home')}  className='transition-all duration-200 flex  hover:bg-gray-900 hover:bg-opacity-20 hover:shadow-lg rounded-lg p-3 cursor-pointer'>
                <img className='p-1 bg-purple-700 rounded-md' src='./img/home.png' width={40} height={40}/>
                <span className='ml-3 font-bold  text-gray-700  mt-2'>Home </span>
            </div>
            <div onClick={getFriends}   className='transition-all duration-200 flex  hover:bg-gray-900 hover:bg-opacity-20 hover:shadow-lg rounded-lg p-3 cursor-pointer'>
                <img  className='p-1 bg-purple-700 rounded-md'src='./img/friends.png' width={40} height={40}/>
                <span className='ml-3 font-bold text-gray-700 mt-2' >Friends</span>
            </div>
            
          </div>
             <div className=' w-8/12  2xl:w-8/12 xl:w-5/12 lg:w-5/12 ' >
               <div>
                 {section==='Home' ? <HomePage/> : <div></div> } 
               </div>
               <div  >
                 {section==='Friends' ? <Friends/> : <div></div>}
               </div>

            </div> 
            <div className ='fixed right-[12px] w-1/5  mt-[100px] z-20'>

               <div  >
                 {section==='Friends' ? <FriendsRight/> : <div></div>}
               </div>
            </div>

      </div>


    </div>
  )
}


export default observer(Home)