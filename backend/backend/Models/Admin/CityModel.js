const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    city:{
        type:String
    },
    country:{
        type:String
    }
})

const City = mongoose.model("City",citySchema);

module.exports = {City}