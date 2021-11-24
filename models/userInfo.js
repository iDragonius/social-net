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
  lastChange:{type:String},
  friends:[{
    friend:{type:Schema.Types.ObjectId, ref:'User'},
    nickname:{type:String, required:true},
    friendFrom:{type:String,required:true},
    accepted:{type:Boolean,required:true}
  }],
  requested:[{
    friend:{type:Schema.Types.ObjectId, ref:'User'},
    nickname:{type:String, required:true}
  }],
  friendsNumber:{type:Number, default:0},
  requestsNumber:{type:Number,default:0}
});

mongoose.models = {};

var UserInfo = mongoose.model('UserInfo', userInfo);

export default UserInfo;