import connectDB from '../../../middleware/mongodb';
import User from '../../../models/user'

const findUser = async (req,res) =>{
    if(req.method ==='GET'){
        const {id} = req.query

        const userData = await User.findOne({email:id})
        if(!userData){
            throw new Error('Wrong id')
        }

        res.json(userData)
        
    }else {
        throw new Error('Не подходящий метод')
    }
}   


export default connectDB(findUser)

