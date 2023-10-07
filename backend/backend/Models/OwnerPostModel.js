const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const ownerPostSchema = new mongoose.Schema({
    title:{
        type:String
    },
    projectType:{
        type:String
    },
    pics:[{
        type:String        
    }],
    isLiked:{
        type:Boolean,
        default:false
    },
    postedBy:{
        type:ObjectId,
        ref:"Owner"
    },
    likedUserDetails:{
        type:ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

const OwnerPost = mongoose.model("OwnerPost" , ownerPostSchema)

module.exports = {OwnerPost}