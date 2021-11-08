import connectDB from '../../middleware/mongodb';
import User from '../../models/user';

const fetch = async (req,res) =>{
    if(req.method === 'GET'){
        try {
            const users = await User.find()
            if(!users){
                return res.status(404).json({error:'Пользователей не найдено'})
            }
            res.json(users)

        } catch (e) {
            console.log(e);
        }

    } else {
        return res.status(500).json({error:'Не подходящий метод'})
    }
}

export default connectDB(fetch);
