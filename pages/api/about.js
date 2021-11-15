import connectDB from "../../middleware/mongodb";
import UserInfo from "../../models/userInfo";
import Token from "../../models/token";
import User from "../../models/user"
import jwt from 'jsonwebtoken'
import moment from "moment";
const about = async (req,res) =>{
    const {refreshToken} = req.cookies
    if (!refreshToken) {
        throw new Error('unauthorizated person')
    }
    const tokenFromDb = await Token.findOne({refreshToken:refreshToken})
    if(!tokenFromDb){
        throw new Error('unauthorizated person')
    }
    const validateToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    if(!validateToken){
        throw new Error('unauthorizated person')
    }
    const{nickname,gender,name,surname,birthday,lastChange} = req.body
    const UserInfos = await UserInfo.findOne({user:tokenFromDb.user})
    const current = lastChange.split('-')

    const last = UserInfos.lastChange ? UserInfos.lastChange : '1910-01-01'
    const lastSplit = last.split('-')
    const years = current[0] - lastSplit[0]
    const months = current[1] - lastSplit[1] + years*12
    const days = current[2] - lastSplit[2] + months*30
    if(days<90){
        if(!UserInfos.nickname){
            nickname ? UserInfos.nickname =nickname : false 
        }
        if(UserInfos.gender==="Unknown"){
            nickname ? UserInfos.gender =gender : false 
        }
        if(!UserInfos.name){
            name ? UserInfos.name= name : false
        }
        if(!UserInfos.surname){
            surname ? UserInfos.surname = surname : false
        }

        if(UserInfos.birthday!=='1910-01-01'){
            birthday ? UserInfos.birthday = birthday : false
        }
        await UserInfos.save()

        return res.json({message:90-days, changed:true})
    }
    UserInfos.lastChange = lastChange
    nickname ? UserInfos.nickname =nickname : false 
    gender ? UserInfos.gender = gender : false
    name ? UserInfos.name= name : false
    surname ? UserInfos.surname = surname : false
    birthday ? UserInfos.birthday = birthday : false
    await UserInfos.save()
    res.json({UserInfos})
}   


export default connectDB(about)