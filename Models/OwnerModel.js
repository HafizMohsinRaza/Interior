const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const ownerSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/dmzzzl5jj/image/upload/v1673894892/avatar_gvyled.jpg"
    },
    verifytoken:{
        type:String
    },
    role:{type:String,enum:["Freelancer","Professional"],required:true},

    companyName:{
        type:String
    },
    category:{
        type:String
    },
    companyFilter:{
        type:String
    },
    emailId:{
        type:String
    },
    contact:[{
        type:String
    }],
    projectStartingCost:{
        type:String
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    country:{
        type:String
    },
    pincode:{
        type:Number
    },
    aboutUs:{
        type:String
    },
    areaOfSurvice:{
        type:String
    },
    services:[{
        type:String
    }],
    achievements:{
        type:String
    },
    profInfo:{
        type:String
    },
    websiteLink:{
        type:String
    },
    facebookLink:{
        type:String
    },
    instagramLink:{
        type:String
    },
    youtubeLink:{
        type:String
    },
    reviews:[{
        text:String,
        rating:Number,
        pic:[{
            type:String
        }],
        postedBy:{type:ObjectId,ref:"User"},
        time:String
    }],
    status:{
        type:Boolean,
        default:true
    },
    clickCount: {
        type: Number,
        default: 0
    },
    ownerId:{type:String}
},{
    timestamps:true
});

const Owner = mongoose.model("Owner",ownerSchema);

module.exports = {Owner};