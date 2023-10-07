const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    projectCategory:{
        type:String,
        required:true
    },
    projectIsFor:{
        type:String,
        enum:["Professional","Freelancer"],
        required:true
    },
    pic:[{
        type:String,
        required:true
    }],
    comments:[{
        text:String,
        commentPics:[{
            type:String,
            required:true
        }],
        postedBy:{type:ObjectId,ref:"Owner"},
        time:String
    }],
    status:{
        type:Boolean,
        default:true
    },
    postedBy:{
        type:ObjectId,
        ref:"User"
    }
},{timestamps:true})

const Post = mongoose.model("Post",postSchema);

module.exports = {Post}