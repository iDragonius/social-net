import connectDB from "../../middleware/mongodb";
import UserInfo from "../../models/userInfo";
import Token from "../../models/token";
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
        const{nickname } = req.body
        const potential = await UserInfo.findOne({nickname:nickname});
        if(!potential){
            return res.status(400).json({message:'error'})
        }
        const user = await UserInfo.findOne({user:tokenFromDb.user})
        if(!user){
            return res.status(400).json({message:'error'})
        }
        const index= user.friends.findIndex(index=>index.nickname===nickname)
        user.friends.splice(index,1)

        user.friendsNumber = user.friendsNumber -1
        const other = potential.friends.findIndex(index=>index.nickname===user.nickname)
        const reqs = potential.requested.findIndex(index=>index.nickanem === user.nickname)
        if(reqs > -1){
            potential.requested.splice(reqs,1)
            potential.requestsNumber-=1
        }
        potential.friends.splice(other,1)
        potential.friendsNumber = potential.friendsNumber -1
        await potential.save()
        await user.save()
        res.json({friends:user.friends})
    } 
}   


export default connectDB(addFriend)