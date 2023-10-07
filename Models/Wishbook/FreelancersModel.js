const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const savedFreelancer = new mongoose.Schema({
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
        ref:"User"
    },
    refId:{
        type:String,
        required:true
    }
});

const SavedFreelancer = mongoose.model("SavedFreelancer",savedFreelancer);

module.exports = {SavedFreelancer};
