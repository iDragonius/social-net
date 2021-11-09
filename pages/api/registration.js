import connectDB from '../../middleware/mongodb';
import bcrypt from 'bcrypt';
import User from '../../models/user';
const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    if ( email && password) {
        try {
          const pass = await bcrypt.hash(password, 3)
          const user = new User({
            email,
            password:pass,
            createdAt:Date.now() 
          });
          const usercreated = await user.save();
          return res.status(200).send(usercreated);
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