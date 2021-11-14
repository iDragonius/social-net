import connectDB from "../../middleware/mongodb";
import User from "../../models/user";
import validator from "validator";
import { v4 as uuidv4 } from 'uuid';
import MailService from '../../services/MailService';


const forgot = async (req,res) =>{
    if(req.method === 'POST'){
        const {email} = req.body
        const isEmail = validator.isEmail(email)
        if(!isEmail){
            return res.status(400).json({message:'Isnt email'})
        }   
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(400).json({message:'Wrong email'})
        }
        const link = uuidv4()
        user.passwordResetLink = link
        await user.save()
        await MailService.sendPasswordResetMail(email, `http://localhost:3000/reset/${link}`)
        res.json({message:'Mail sended'})
    }
}

export default connectDB(forgot)