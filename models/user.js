import mongoose  from 'mongoose'

var Schema = mongoose.Schema;

const user = new Schema({
  email: {type: String,required: true,unique:true},
  password: {type: String,required: true},
  createdAt:{type:String},
  activationLink:{type:String},
  isActivated:{type:Boolean, default:false},
  passwordResetLink:{type:String}
});

mongoose.models = {};

var User = mongoose.model('User', user);

export default User;