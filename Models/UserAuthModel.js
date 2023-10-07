const mongoose = require('mongoose');

const userAuthSchema = new mongoose.Schema({
    username: String,
    email: String,
    googleId: String,
    pic:{
        type:String,
        default:"https://res.cloudinary.com/dmzzzl5jj/image/upload/v1673894892/avatar_gvyled.jpg"
    },
    token:{type:String},
    role:{type:String,enum:["Customer"]},
},{
    timestamps:true
})

const UserAuth = mongoose.model("UserAuth" , userAuthSchema);

module.exports = {UserAuth}

