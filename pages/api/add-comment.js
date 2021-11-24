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
        const{nickname,comment, user, createdId, createdAt, post } = req.body
        const commentedPost = await Post.findOne({_id:post})
        if(!commentedPost){
            return res.status(400).json({message:'4'})
        }
        const schem = {
            nickname:nickname,
            comment:comment,
            createdId:createdId,
            createdAt:createdAt,
            user:user
        }
        commentedPost.comments.push(schem)
        commentedPost.commentNumber = commentedPost.commentNumber +1

      
        await commentedPost.save()
        const postAll = await Post.find().sort({createdId:-1})

        res.json({posts:postAll})
    } 
}   


export default connectDB(addFriend)