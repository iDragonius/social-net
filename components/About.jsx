import React, {useContext, useEffect,useRef, useState} from 'react'
import $api from '../http'
import { Context } from '../pages/_app'
import moment from 'moment'
import Warning from './about/Warning'
const About = () => {
    const {store} = useContext(Context)
    const [name, setName] = useState(store.userInfo.name)
    const [surname, setSurname] =useState(store.userInfo.surname)
    const [gender, setGender] = useState(store.userInfo.gender)
    const [birthday, setBirthday] = useState(store.userInfo.birthday ? store.userInfo.birthday[0]+store.userInfo.birthday[1]+store.userInfo.birthday[2]+store.userInfo.birthday[3] +'-'+store.userInfo.birthday[5]+store.userInfo.birthday[6]+'-'+store.userInfo.birthday[8]+store.userInfo.birthday[9] : '1910-01-01')
    const [configure, setConfigure] = useState(true)
    const [changed, setChanged] = useState(true)
    const [days, setDays] = useState(0)
    const change = ()=>{
        if(configure){
            setConfigure(false)
        } else {
            const answer =confirm('Save changes?')
            if(answer){
                save()
            } else {
                setName(store.userInfo.name)
                setSurname(store.userInfo.surname)
                setGender(store.userInfo.gender)
                setBirthday(store.userInfo.birthday ? store.userInfo.birthday[0]+store.userInfo.birthday[1]+store.userInfo.birthday[2]+store.userInfo.birthday[3] +'-'+store.userInfo.birthday[5]+store.userInfo.birthday[6]+'-'+store.userInfo.birthday[8]+store.userInfo.birthday[9] : '1910-01-01')
            }
            setConfigure(true)
        }
    }
    useEffect(()=>{
          document.body.classList.remove('overflow-y-hidden')

        const select = document.getElementById('gender').childNodes
        for(let item of select) {
            if(item.value === store.userInfo.gender){
                item.setAttribute('selected', true )
            } else {
                item.removeAttribute('selected')
            }
        }
       
        
    },[])
    const save = async () =>{
        await $api.post('/about',{
            name:name,
            surname:surname,
            gender:gender,
            birthday:birthday,
            lastChange: moment(Date.now()).format('YYYY-MM-DD')
        }).then((response=>{
            if(response.data.changed){
                setChanged(false)
                setConfigure(true)
                setDays(response.data.message)
                console.log(2);
            }else{
                console.log(1);
                setChanged(true)
                console.log(response)
                setConfigure(true)
            }
            
        }))
        
    }


    return (
        <div className = 'mt-28 ml-4 flex flex-col transition-all duration-300 pb-40'>
            <div className=' mx-auto flex px-5 py-2 rounded-md d shadow-lg   cursor-auto bg-white' >
                <div className='flex '>
                    <div className = 'p-3 bg-purple-700 w-max rounded-md z-10' ><img src="./img/user.png" alt="User" width='26px' /></div>
                    <h1 className = 'font-bold text-xl bg-purple-600 py-3 px-10 rounded-md text-white relative right-3 z-0'>Welcome, <span className = 'border-b-2'>{store.userInfo.nickname ? store.userInfo.nickname :store.user.email }</span> ! </h1>
                </div>
                <div onClick={change} className = 'p-3   bg-purple-700 w-max rounded-md z-10 shadow-md cursor-pointer' ><img src="./img/two-arrows.png" alt="User" className='pt-[2px]' width='26px' /></div>
                
            </div>
            <div className='flex flex-col mx-auto justify-center mt-10 rounded-xl shadow-lg w-full pb-10 pt-7 bg-white '>
                    <div className = 'text-xl font-bold text-white py-2 px-6 shadow-xl mb-5 bg-purple-700 w-content mx-auto rounded-lg'>Personal information:</div>
                    {changed? '':  <Warning days={days} />}

                    <div className='flex w-8/12 mb-5  self-center '>
                        <div className = 'font-bold text-lg py-2 px-4 bg-purple-600 text-white rounded-md z-10'>Name</div>
                        <input value={name}  onChange = {(e)=>setName(e.target.value)} readOnly={configure} type="text" className = 'cursor-auto font-semibold w-11/12 text-lg py-2 px-5 bg-purple-400 text-white rounded-md outline-none z-0 relative right-3'/>
                    </div>
                    <div className='flex w-8/12 mb-5  self-center '>
                        <div className = 'font-bold text-lg py-2 px-4 bg-purple-600 text-white rounded-md z-10'>Surname</div>
                        <input  value={surname}  onChange = {(e)=>setSurname(e.target.value)} readOnly={configure} type="text" className = 'cursor-auto font-semibold w-11/12 text-lg py-2 px-5 bg-purple-400 text-white rounded-md outline-none z-0 relative right-3'/>
                    </div>
                    <div className='flex w-8/12 mb-5  self-center '>
                        <div className = 'font-bold text-lg py-2 px-4 bg-purple-600 text-white rounded-md z-10'>Birthday</div>
                        <input value={birthday ?  birthday : '1910-01-01'} onChange={(e)=>setBirthday(e.target.value)}  readOnly={configure} type="date" className = 'cursor-auto font-semibold w-11/12 text-lg py-2 px-5 bg-purple-400 text-white rounded-md outline-none z-0 relative right-3'/>
                    </div>
                    <div className='flex w-8/12   self-center '>
                        <div  className = 'font-bold text-lg py-2 px-4 bg-purple-600 text-white rounded-md z-10'>Gender</div>
                        <select onChange={(e)=>setGender(e.target.value)} id='gender' disabled={configure} className = 'font-semibold w-11/12 text-lg py-2 px-5 bg-purple-400 text-white rounded-md outline-none z-0 relative right-3'>
                            <option defaultValue>Unknown</option>
                            <option>Man</option>
                            <option>Woman</option>
                        </select>
                    </div>
                    {configure? '' :<button 
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            save()
                                        }} 
                                        className = 'transition-all duration-300 font-bold text-lg py-2 px-10 mx-auto mt-6 bg-purple-600 text-white rounded w-min'>
                                            Save
                                    </button>}
                </div>
                <div className='flex flex-col mx-auto justify-center mt-10 rounded-lg shadow-lg w-full pb-10 pt-7 bg-white '>
                <div className = 'text-lg font-bold text-white py-2 px-6 shadow-lg mb-5 bg-purple-700 w-content mx-auto rounded-lg'>Account information:</div>
                <div className='flex w-8/12 mb-5  self-center '>
                    <div className = 'font-bold text-lg py-2 px-4 bg-purple-600 text-white rounded-md z-10'>Nickname</div>
                    <div className = 'cursor-auto font-semibold w-11/12 text-lg py-2 px-5 text-left bg-purple-400 text-white rounded-md outline-none z-0 relative right-3'>{store.userInfo.nickname}</div>
                </div>
                <div className='flex w-8/12 mb-5  self-center '>
                    <div className = 'font-bold text-lg py-2 px-4 bg-purple-600 text-white rounded-md z-10'>Email</div>
                    <div className = 'cursor-auto font-semibold w-11/12 text-lg py-2 px-5 text-left bg-purple-400 text-white rounded-md outline-none z-0 relative right-3'>{store.user.email}</div>
                </div>
                <div className='flex w-8/12 mb-5 self-center'>
                    <div className = 'w-[300px] font-bold text-lg py-2 px-4 bg-purple-600 text-white rounded-md z-10'>Registration Date</div>
                    <div  className = 'cursor-auto font-semibold w-11/12 text-lg text-left py-2 px-5 bg-purple-400 text-white rounded-md outline-none z-0 relative right-3'>{moment(parseInt(store.user.createdAt)).format('DD MM, YYYY')}</div>
                </div>
                <div className='flex w-8/12 mb-5  self-center '>
                    <div className = 'w-[300px] font-bold text-lg py-2 px-4 bg-purple-600 text-white rounded-md z-10'>Account activation</div>
                    <div className = 'cursor-auto font-semibold w-11/12 text-lg py-2 px-5 text-left bg-purple-400 text-white rounded-md outline-none z-0 relative right-3'>{store.isActived===false ? 'The account is not activated' : "The account activated"}</div>
                </div>
                
                </div>
        </div>
    )
}

export default About
