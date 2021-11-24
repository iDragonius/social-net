import connectDB from "../../middleware/mongodb";
import UserInfo from "../../models/userInfo";
import Token from "../../models/token";
import jwt from 'jsonwebtoken'

const deleteReq = async (req,res) =>{
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
        const{nickname } = req.body
        const potential = await UserInfo.findOne({nickname:nickname});
        if(!potential){
            return res.status(400).json({message:'error1'})
        }
        const user = await UserInfo.findOne({user:tokenFromDb.user})
        if(!user){
            return res.status(400).json({message:'error2'})
        }
        const index =user.requested.findIndex(index=>index.nickname === nickname)
        const other = potential.friends.findIndex(index=>index.nickname===user.nickname && !index.accepted)
        if(other==-1){
            return res.status(400).json({message:'error3'})
        }
        potential.friends.splice(other,1)
        user.requested.splice(index,1)
        user.requestsNumber=user.requestsNumber -1
        await potential.save()
        await user.save()
        res.json({friends:user,friend:potential})
    } 
}   


export default connectDB(deleteReq)