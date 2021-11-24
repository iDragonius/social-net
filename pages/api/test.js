import connectDB from "../../middleware/mongodb";
import UserInfo from "../../models/userInfo";
import Token from "../../models/token";
import Post from "../../models/post";
import jwt from 'jsonwebtoken'

const addFriend = async (req,res) =>{
    if(req.method ==="POST"){
      
        const{nickname } = req.body
        const user = await UserInfo.findOne({nickname:nickname})
        const fr = user.friends.findIndex(item=>item.nickname==="Admin")
        // if(!potential){
        //     return res.status(400).json({message:'error'})
        // }
        // if(!user){
        //     return res.status(400).json({message:'error'})
        // }
        // const schem = {
        //     friend:user.user,
        //     friendFrom:friendFrom,
        //     nickname:user.nickname,
        //     accepted:false,

        // }
        // potential.friends.push(schem)
        // potential.friendsNumber = potential.friendsNumber + 1 
        // await potential.save()
        res.json({user:fr})
    } 
}   


export default connectDB(addFriend)