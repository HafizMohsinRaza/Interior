const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String
    },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/dmzzzl5jj/image/upload/v1673894892/avatar_gvyled.jpg"
    },
    gender:{
        type:String,
        default:"Male"
    },
    phone:{
        type:String
    },
    verifytoken:{
        type:String
    },
    role:{type:String,enum:["Customer"],required:true},
    userId:{type:String}
},{
    timestamps:true
})

const User = mongoose.model("User" , userSchema)

module.exports = {User}