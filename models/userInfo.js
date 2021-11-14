import mongoose  from 'mongoose'

var Schema = mongoose.Schema;

const userInfo = new Schema({
  user:{type:Schema.Types.ObjectId, ref:'User'},
  nickname: {type: String},
  name: {type: String},
  surname:{type:String},
  birthday:{type:Date},
  gender:{type:String, default:'unknown'}
});

mongoose.models = {};

var UserInfo = mongoose.model('UserInfo', userInfo);

export default UserInfo;