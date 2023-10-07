const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const savedPhotos = new mongoose.Schema({
    pic:[{
        type:String,
        required:true
    }],
    companyName:{
        type:String
    },
    isLiked:{
        type:Boolean,
        default:false
    },
    postedBy:{
        type:ObjectId,
        ref:"User",
        required:false
    },
    refId:{
        type:String,
        required:true
    }
})

const SavedPhoto = mongoose.model("SavedPhoto" , savedPhotos);

module.exports = {SavedPhoto}