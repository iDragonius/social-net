import mongoose  from 'mongoose'

var Schema = mongoose.Schema;

const post = new Schema({
    user:{type:Schema.Types.ObjectId, ref:"User"},
    nickname:{type:String, required:true},
    createdId:{type:Date, required:true},
    content:{type:String, required:true},
    createdAt:{type:String, required:true},
    comments:[{
        user:{type:Schema.Types.ObjectId, ref:"User"},
        nickname:{type:String, required:true},
        comment:{type:String, required:true},
        createdId:{type:Date, required:true},
        createdAt:{type:String, required:true},
    }],
    commentNumber:{type:Number, default:0},
    likes:{
        likes:{type:Number, default:0},
        user:[{type:Schema.Types.ObjectId, ref:"User"}]
    }
});

mongoose.models = {};

var Post = mongoose.model('Post', post);

export default Post;