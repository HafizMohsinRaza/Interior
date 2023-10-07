const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const ownerSavedFreelancer = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
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
    reviews:[{
        text:{ type: String },
        rating: { type: Number }
    }],
    postedBy:{
        type:ObjectId,
        ref:"Owner"
    },
    refId:{
        type:String,
        required:true
    }
})

const OwnerSavedFreeelancer = mongoose.model("OwnerSavedFreelancer",ownerSavedFreelancer);

module.exports = {OwnerSavedFreeelancer}