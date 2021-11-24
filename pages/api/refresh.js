import connectDB from "../../middleware/mongodb";
import Token from "../../models/token";
import User from "../../models/user";
import jwt from "jsonwebtoken"
import {  setCookies } from 'cookies-next';
import UserInfo from '../../models/userInfo'
import Post from "../../models/post";
const refresh = async (req,res) =>{
    if(req.method === 'GET'){
        const {refreshToken} = req.cookies
        if (!refreshToken) {
            throw new Error('unauthorizated person')
        }
        const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const tokenFromDb = await Token.findOne({refreshToken:refreshToken});
        if (!user ) {
            throw new Error('unauthorizated person')
        }
        if (!tokenFromDb) {
            throw new Error('unauthorizated person')
        }
        const userDB = await User.findById(user.id);
        const userDto = {
            email:userDB.email,
            id:userDB._id,
            isActivated:userDB.isActivated,
            createdAt:userDB.createdAt
          }
          const accessToken = jwt.sign(userDto, process.env.JWT_ACCESS_SECRET, {expiresIn: '15d'})
          const refresh = jwt.sign(userDto, process.env.JWT_REFRESH_SECRET, {expiresIn: '60d'})
        const tokens = {
            accessToken,
            refresh
        }
        const tokenData = await Token.findOne({user: userDto.id})
        tokenData.refreshToken = tokens.refresh;
        await tokenData.save();
        const posts = await Post.find().sort({createdAt:-1})
        setCookies('refreshToken', tokens.refresh, {req,res,maxAge: 30*24*60*60*100, httpOnly: true})
        const userInfos = await UserInfo.findOne({user:userDto.id})

        res.json({refreshToken:tokens.refresh,accessToken:tokens.accessToken, userInfo: userDto, userAbout:userInfos}) 
    }else {
        throw new Error('wrong method')
    }
}

export default connectDB(refresh)