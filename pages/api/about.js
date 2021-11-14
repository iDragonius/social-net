import connectDB from "../../middleware/mongodb";
import UserInfo from "../../models/userInfo";
import Token from "../../models/token";
import User from "../../models/user"
import jwt from 'jsonwebtoken'

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
    const{nickname,gender,name,surname,birthday} = req.body
    const UserInfos = await UserInfo.findOne({user:tokenFromDb.user})
    nickname ? UserInfos.nickname =nickname : false 
    gender ? UserInfos.gender = gender : false
    name ? UserInfos.name= name : false
    surname ? UserInfos.surname = surname : false
    birthday ? UserInfos.birthday = birthday : false
    await UserInfos.save()
    res.json({UserInfos})
}   


export default connectDB(about)