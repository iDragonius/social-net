import connectDB from '../../middleware/mongodb';
import bcrypt from 'bcrypt';
import User from '../../models/user';

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
        res.json(dataUser)
    } else {
        res.status(500).json({error:'Не подходящий метод'})
    }
}

export default connectDB(login)