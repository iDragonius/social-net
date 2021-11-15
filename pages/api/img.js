import connectDB from "../../middleware/mongodb";
import UserInfo from "../../models/userInfo";
import Token from "../../models/token";
import jwt from 'jsonwebtoken'

const pp = async (req,res) =>{
    if(req.method ==="POST"){
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
        const{img} = req.body
        const UserInfos = await UserInfo.findOne({user:tokenFromDb.user})
        UserInfos.img = img
        await UserInfos.save()
        res.json({UserInfos})
    } 
}   


export default connectDB(pp)