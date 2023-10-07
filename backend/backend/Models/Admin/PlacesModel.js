const mongoose = require('mongoose');

const placesSchema = new mongoose.Schema({
    place:{
        type:String
    },
    pincode:{
        type:String
    },
    city:{
        type:String
    },
    country:{
        type:String
    }
})

const Places = mongoose.model("Places",placesSchema);

module.exports = {Places}