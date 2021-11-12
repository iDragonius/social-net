import mongoose  from 'mongoose'

var Schema = mongoose.Schema;

const token = new Schema({
  user: {type: Schema.Types.ObjectId,ref:'User'},
  refreshToken: {type: String,required: true},
});

mongoose.models = {};

var Token = mongoose.model('Token', token);

export default Token;