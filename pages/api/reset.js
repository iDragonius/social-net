import connectDB from "../../middleware/mongodb";
import User from "../../models/user";
import validator from "validator";
import bcrypt from 'bcrypt'
import Token from "../../models/token";
import jwt from 'jsonwebtoken'
const reset = async (req,res)=>{
    if(req.method === "POST"){
        const {password} = req.body
        const passValidator = validator.isLength(password, {min:5, max:16}) 
        if(!passValidator){
            return res.status(400).json({message:'Password so short'})
        }
        const hashPassword = await bcrypt.hash(password,3)
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
        const user = await User.findOne({_id:tokenFromDb.user})
        user.password = hashPassword;
        await user.save()
        res.json({message:'password changed'})
    } else {
        return res.status(400).json({message:'unauthorized person'})
    }
}

export default connectDB(reset)