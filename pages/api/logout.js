import connectDB from "../../middleware/mongodb";
import Token from "../../models/token";
import User from "../../models/user";
import jwt from "jsonwebtoken"
import { removeCookies } from "cookies-next";
const logout = async (req,res) =>{
    if(req.method === 'POST'){
        const {refreshToken} = req.cookies;
        const token = await Token.deleteOne({refreshToken})
        removeCookies('token', {req,res})
        res.json(token)
    }else {
        throw new Error('wrong method')
    }
}

export default connectDB(logout)