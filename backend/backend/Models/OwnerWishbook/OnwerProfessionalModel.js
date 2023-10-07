const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const ownerSavedProfessional = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/dmzzzl5jj/image/upload/v1673894892/avatar_gvyled.jpg"
    },
    companyName:{
        type:String
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    country:{
        type:String
    },
    rating:{
        type:String
    },
    contact:[{
        type:String
    }],
    reviews:{type:Array},
    postedBy:{
        type:ObjectId,
        ref:"User"
    },
    refId:{
        type:String,
        required:true
    }
})

const OwnerSavedProfessional = mongoose.model("OwnerSavedProfessional",ownerSavedProfessional)

module.exports = {OwnerSavedProfessional}