import React, {useContext, useEffect,useRef, useState} from 'react'
import $api from '../http'
import { Context } from '../pages/_app'
import moment from 'moment'
const About = () => {
    const {store} = useContext(Context)
    const [nickname, setNickanme] = useState(store.userInfo.nickname)
    const [name, setName] = useState(store.userInfo.name)
    const [surname, setSurname] =useState(store.userInfo.surname)
    const [gender, setGender] = useState(store.userInfo.gender)
    const [birthday, setBirthday] = useState(store.userInfo.birthday ? store.userInfo.birthday[0]+store.userInfo.birthday[1]+store.userInfo.birthday[2]+store.userInfo.birthday[3] +'-'+store.userInfo.birthday[5]+store.userInfo.birthday[6]+'-'+store.userInfo.birthday[8]+store.userInfo.birthday[9] : '1910-01-01')
    const [configure, setConfigure] = useState(true)
    const change = ()=>{
        if(configure){
            setConfigure(false)
        } else {
            setConfigure(true)
        }
    }
    useEffect(()=>{
        const select = document.getElementById('gender').childNodes
        for(let item of select) {
            if(item.value === store.userInfo.gender){
                item.setAttribute('selected', true )
            } else {
                item.removeAttribute('selected')
            }
        }
       
        
    },[])
    const save = async (e) =>{
        e.preventDefault()
        await $api.post('/about',{
            name:name,
            surname:surname,
            nickname:nickname,
            gender:gender,
            birthday:birthday
        }).then((response=>{
            console.log(response)
            setConfigure(true)
        }))
        
    }


    return (
        <div className = 'mt-28 ml-4 flex flex-col transition-all duration-300 pb-40'>
            <div className=' mx-auto flex p-5 rounded-md d shadow-lg   cursor-auto bg-white' >
                <div className='flex '>
                    <div className = 'p-5 bg-indigo-700 w-max rounded-md z-10' ><img src="./img/user.png" alt="User" width='36px' /></div>
                    <h1 className = 'font-bold text-3xl bg-indigo-500 py-5 px-10 rounded-md text-white relative right-3 z-0'>Welcome, <span className = 'border-b-2'>{store.userInfo.nickname ? store.userInfo.nickname :store.user.email }</span> ! </h1>
                </div>
                <div onClick={change} className = 'p-5 bg-indigo-700 w-max rounded-md z-10 shadow-md cursor-pointer' ><img src="./img/two-arrows.png" alt="User" width='36px' /></div>
                
            </div>
            <div className='flex flex-col mx-auto justify-center mt-10 rounded-xl shadow-lg w-full pb-10 pt-7 bg-white '>
                    <div className = 'text-3xl font-bold text-white py-4 px-6 shadow-xl mb-5 bg-indigo-700 w-content mx-auto rounded-lg'>Personal information:</div>
                    <div className='flex w-8/12 mb-5  self-center '>
                        <div className = 'font-bold text-xl p-4 bg-indigo-600 text-white rounded-md z-10'>Nickname</div>
                        <input value={nickname}  onChange = {(e)=>setNickanme(e.target.value)}readOnly={configure} type="text" className = 'cursor-auto font-semibold w-11/12 text-xl py-4 px-5 bg-indigo-400 text-white rounded-md outline-none z-0 relative right-3'/>
                    </div>
                    <div className='flex w-8/12 mb-5  self-center '>
                        <div className = 'font-bold text-xl p-4 bg-indigo-600 text-white rounded-md z-10'>Name</div>
                        <input value={name}  onChange = {(e)=>setName(e.target.value)} readOnly={configure} type="text" className = 'cursor-auto font-semibold w-11/12 text-xl py-4 px-5 bg-indigo-400 text-white rounded-md outline-none z-0 relative right-3'/>
                    </div>
                    <div className='flex w-8/12 mb-5  self-center '>
                        <div className = 'font-bold text-xl p-4 bg-indigo-600 text-white rounded-md z-10'>Surname</div>
                        <input  value={surname}  onChange = {(e)=>setSurname(e.target.value)} readOnly={configure} type="text" className = 'cursor-auto font-semibold w-11/12 text-xl py-4 px-5 bg-indigo-400 text-white rounded-md outline-none z-0 relative right-3'/>
                    </div>
                    <div className='flex w-8/12 mb-5  self-center '>
                        <div className = 'font-bold text-xl p-4 bg-indigo-600 text-white rounded-md z-10'>Birthday</div>
                        <input value={birthday ?  birthday : '1910-01-01'} onChange={(e)=>setBirthday(e.target.value)}  readOnly={configure} type="date" className = 'cursor-auto font-semibold w-11/12 text-xl py-4 px-5 bg-indigo-400 text-white rounded-md outline-none z-0 relative right-3'/>
                    </div>
                    <div className='flex w-8/12   self-center '>
                        <div  className = 'font-bold text-xl p-4 bg-indigo-600 text-white rounded-md z-10'>Gender</div>
                        <select onChange={(e)=>setGender(e.target.value)} id='gender' disabled={configure} className = 'font-semibold w-11/12 text-xl py-4 px-5 bg-indigo-400 text-white rounded-md outline-none z-0 relative right-3'>
                            <option defaultValue>Unknown</option>
                            <option>Man</option>
                            <option>Woman</option>
                        </select>
                    </div>
                    {configure? '' :<button onClick={save} className = 'transition-all duration-300 font-bold text-xl py-4 px-10 mx-auto mt-6 bg-indigo-600 text-white rounded w-min'>Save</button>}
                </div>
                <div className='flex flex-col mx-auto justify-center mt-10 rounded-xl shadow-lg w-full pb-10 pt-7 bg-white '>
                <div className = 'text-3xl font-bold text-white py-4 px-6 shadow-xl mb-5 bg-indigo-700 w-content mx-auto rounded-lg'>Account information:</div>

                <div className='flex w-8/12 mb-5  self-center '>
                    <div className = 'font-bold text-xl p-4 bg-indigo-600 text-white rounded-md z-10'>Email</div>
                    <div className = 'cursor-auto font-semibold w-11/12 text-xl py-4 px-5 text-left bg-indigo-400 text-white rounded-md outline-none z-0 relative right-3'>{store.user.email}</div>
                </div>
                <div className='flex w-8/12 mb-5 self-center'>
                    <div className = 'w-[300px] font-bold text-xl p-4 bg-indigo-600 text-white rounded-md z-10'>Registration Date</div>
                    <div  className = 'cursor-auto font-semibold w-11/12 text-xl text-left py-4 px-5 bg-indigo-400 text-white rounded-md outline-none z-0 relative right-3'>{moment(parseInt(store.user.createdAt)).format('DD MM, YYYY')}</div>
                </div>
                <div className='flex w-8/12 mb-5  self-center '>
                    <div className = 'w-[300px] font-bold text-xl p-4 bg-indigo-600 text-white rounded-md z-10'>Account activation</div>
                    <div className = 'cursor-auto font-semibold w-11/12 text-xl py-4 px-5 text-left bg-indigo-400 text-white rounded-md outline-none z-0 relative right-3'>{store.isActived===false ? 'The account is not activated' : "The account activated"}</div>
                </div>
                
                </div>
        </div>
    )
}

export default About
