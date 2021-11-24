import connectDB from "../../middleware/mongodb";
import UserInfo from "../../models/userInfo";
import Token from "../../models/token";
import Post from "../../models/post";
import jwt from 'jsonwebtoken'

const addFriend = async (req,res) =>{
    if(req.method ==="POST"){
        const {refreshToken} = req.cookies
        if (!refreshToken) {
            return res.status(400).json({message:'1'})
        }
        const tokenFromDb = await Token.findOne({refreshToken:refreshToken})
        if(!tokenFromDb){
            return  res.status(400).json({message:'2'})
        }
        const validateToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
        if(!validateToken){
           return res.status(400).json({message:'3'})
        }
        const{nickname,friendFrom } = req.body
        const potential = await UserInfo.findOne({nickname:nickname});
        const user = await UserInfo.findOne({user:tokenFromDb.user})
        if(nickname === user.nickname){
            return res.status(402).json({message:'error'})

        }
        if(!potential){
            return res.status(400).json({message:'error'})
        }
        if(!user){
            return res.status(400).json({message:'error'})
        }
        const index = potential.friends.findIndex(index=>index.nickname===nickname)
        const other = user.requested.findIndex(index=>index.nickname === potential.nickname)
        if(other >-1){
            return res.status(400).json({message:'requested'})
        }
        if(index >-1){
            return res.status(400).json({message:'requested'})
        }
        const schem = {
            friend:user.user,
            friendFrom:friendFrom,
            nickname:user.nickname,
            accepted:false,

        }
        const schemUser = {
            friend: potential.user ,
            nickname: nickname
        }
        potential.friends.push(schem)
        user.requested.push(schemUser)
        user.requestsNumber+=1
        await user.save()
        await potential.save()
        res.json({user:user, friend:potential})
    } 
}   


export default connectDB(addFriend)