const mongoose = require("mongoose");

const managePagesSchema = new mongoose.Schema({
    aboutUs:{
        type:String
    },
    contact:[{
        type:String
    }],
    termsCondition:{
        type:String
    },
    privacyPolicy:{
        type:String
    },
    copyright:{
        type:String
    },
    faq:{
        type:String
    }
})

const ManagePages = mongoose.model("ManagePages" , managePagesSchema)

module.exports = {ManagePages}