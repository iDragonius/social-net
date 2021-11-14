import connectDB from '../../middleware/mongodb';
import User from '../../models/user';
import jwt from 'jsonwebtoken'

const fecth = async (req,res) =>{
    const auth = req.headers.authorization
    if(!auth) {
        throw new Error('.1')
    }
    const accessToken = auth.split(' ')[1]
    if(!accessToken) {
        throw new Error('.2')
    }
    const userData = jwt.verify(accessToken, process.env.JWT_REFRESH_SECRET);

    if(!userData) {
        throw new Error('.3')
    }
    const users = await User.find()
    

    res.json(users)
}


export default connectDB(fecth);
