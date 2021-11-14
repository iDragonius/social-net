import connectDB from '../../middleware/mongodb';
import bcrypt from 'bcrypt';
import User from '../../models/user';
import Token from '../../models/token';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import MailService from '../../services/MailService';
import jwt from 'jsonwebtoken'
import {  setCookies } from 'cookies-next';
import UserInfo  from '../../models/userInfo'
const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    if ( email && password) {
        try {
          const pass = await bcrypt.hash(password, 3)
          const activationLink = uuidv4()
          const validEmail = validator.isEmail(email)
          const validPassword = validator.isLength(password, {min:5, max: 16})
          if(!validEmail){
            return res.status(400).json({message:'email'})
          }
          if(!validPassword){
            return res.status(400).json({message:'pass'})
          }
          const checkhMail = await User.findOne({email:email})
          if(checkhMail){
            return res.status(400).json({message:'такой пользователь уже существует'})
          }
          const userInfo2 = await User.create({ email:email,password:pass,createdAt:Date.now(),activationLink:activationLink})
          const userDto = {
            email:userInfo2.email,
            id:userInfo2._id,
            isActivated:userInfo2.isActivated,
            createdAt:userInfo2.createdAt
          }
          const accessToken = jwt.sign(userDto, process.env.JWT_ACCESS_SECRET, {expiresIn: '15d'})
          const refreshToken = jwt.sign(userDto, process.env.JWT_REFRESH_SECRET, {expiresIn: '60d'})
          const tokens = {
            accessToken,
            refreshToken
          }
          await MailService.sendActivationMail(email, activationLink)
          await userInfo2.save();
          const TokenModel =await Token.create({user:userDto.id, refreshToken:tokens.refreshToken})
          const UserInfos = await UserInfo.create({user:userDto.id})
          return res.json({status:'correct'});
        } catch (error) {
          return res.status(500).send(error.message);
        }
      } else {
        res.status(422).send('data_incomplete');
      }
  } else {
    res.status(422).send('req_method_not_supported');
  }
};

export default connectDB(handler);