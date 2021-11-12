import connectDB from '../../middleware/mongodb';
import bcrypt from 'bcrypt';
import User from '../../models/user';
import Token from '../../models/token';
import jwt from 'jsonwebtoken'
import { setCookies } from 'cookies-next';
const login = async (req,res)=> {
    if(req.method = 'POST'){
        const {email, password} = req.body;
        if(!email){
            throw new Error('Почта не указана')
        }
        if(!password){
            throw new Error('Введите пароль')
        }
        const dataUser = await User.findOne({email})
        if(!dataUser){
            throw new Error('Такого пользователя не существует')
        }
        const isPasswordsEquals = await bcrypt.compare(password, dataUser.password)
        if(!isPasswordsEquals){
            throw new Error('Пароль неверный')
        }
        const userDto = {
            email:dataUser.email,
            id:dataUser._id,
            isActivated:dataUser.isActivated,
            createdAt:dataUser.createdAt
        }
        const tokenModel = await Token.findOne({user:userDto.id})
        const accessToken = jwt.sign(userDto, process.env.JWT_ACCESS_SECRET, {expiresIn: '60d'})
        const refreshToken = jwt.sign(userDto, process.env.JWT_REFRESH_SECRET, {expiresIn: '15d'})
        const tokens = {
        accessToken,
        refreshToken
        }
        let userToken = {}
        if(!tokenModel){
            userToken = await Token.create({user: userDto.id, refreshToken})
        } else{
            tokenModel.refreshToken = refreshToken
            await tokenModel.save()
            userToken = tokenModel
        }
      
        setCookies('refreshToken', tokens.refreshToken, {req,res,maxAge: 30*24*60*60*100, httpOnly: true})

        res.json({...tokens,userInfo:userDto})
    } else {
        res.status(500).json({error:'Не подходящий метод'})
    }
}

export default connectDB(login)