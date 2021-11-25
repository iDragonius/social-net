import connectDB from "../../middleware/mongodb";
import UserInfo from "../../models/userInfo";
import Token from "../../models/token";
import Post from "../../models/post";
import jwt from 'jsonwebtoken'

const getUserPosts = async (req,res) =>{
    if(req.method ==="POST"){

        const {nickname} = req.body
        const posts = await Post.find({nickname:nickname}).sort({createdId:-1}).limit(10)



        


        res.json({posts:posts})
    } 
}   


export default connectDB(getUserPosts)