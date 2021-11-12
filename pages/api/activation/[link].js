import connectDB from '../../../middleware/mongodb';
import User from '../../../models/user'

const accountActivation = async (req,res) =>{
    if(req.method ==='GET'){
        const {link} = req.query
        if(!link){
            return res.status(400)
        }
        const check = await User.findOne({activationLink:link})
        if(!check){
            return res.status(400).json({message:'wrong code'})
        }
        check.isActivated = true
        await check.save()
        res.json(check);
    }else {
        throw new Error('Не подходящий метод')
        
    }
}

export default connectDB(accountActivation)