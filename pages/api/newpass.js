import connectDB from "../../middleware/mongodb";
import User from "../../models/user";
import validator from "validator";
import bcrypt from 'bcrypt'
const newPassword = async (req,res) =>{
    const {password, link} = req.body
    const validPass = validator.isLength(password,{min:5,max:16})
    if(!validPass){
        return res.status(400).json({message:'So shord password'})
    }
    const user = await User.findOne({passwordResetLink:link})
    if(!user){
        return res.status(400).json({message:'Invalid link'})
    }
    const hashPass = await bcrypt.hash(password, 3)
    user.password = hashPass;
    user.passwordResetLink = undefined
    await user.save()
    res.json({message:"Password changed"})
}

export default connectDB(newPassword)