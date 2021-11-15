import mongoose  from 'mongoose'

var Schema = mongoose.Schema;

const userInfo = new Schema({
  user:{type:Schema.Types.ObjectId, ref:'User'},
  nickname: {type: String, unique:true},
  name: {type: String},
  surname:{type:String},
  birthday:{type:String},
  gender:{type:String, default:'Unknown'},
  img: {type:String},
  lastChange:{type:String}
});

mongoose.models = {};

var UserInfo = mongoose.model('UserInfo', userInfo);

export default UserInfo;