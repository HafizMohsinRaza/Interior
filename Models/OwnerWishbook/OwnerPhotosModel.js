const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const ownerSavedPhotos = new mongoose.Schema({
    pic:[{
        type:String,
        required:true
    }],
    companyName:{
        type:String
    },
    status:{
        type:String,
        default:false
    },
    postedBy:{
        type:ObjectId,
        ref:"Owner",
        required:false
    },
    refId:{
        type:String,
        required:true
    }
})

const OwnerSavedPhoto = mongoose.model("OwnersavedPhoto" , ownerSavedPhotos);

module.exports = {OwnerSavedPhoto}