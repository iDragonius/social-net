import connectDB from "../../middleware/mongodb";
import UserInfo from "../../models/userInfo";
import Token from "../../models/token";
import Post from "../../models/post";
import jwt from 'jsonwebtoken'

const addFriend = async (req,res) =>{
    if(req.method ==="GET"){
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
        const user = await UserInfo.findOne({user:tokenFromDb.user})
        

        if(!user){
            return res.status(400).json({message:'error'})
        }


        res.json({user})
    } 
}   


export default connectDB(addFriend)