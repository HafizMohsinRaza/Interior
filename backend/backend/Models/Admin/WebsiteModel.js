const mongoose = require("mongoose");

const websiteSettingSchema = new mongoose.Schema({
    title:{
        type:String
    },
    homeSolution:{
        type:String
    },
    contact:[{
            type:String 
    }],
    email:[{
        type:String
    }],
    address:{
        type:String
    },
    metaKeywords:{
        type:String
    },
    metaDescription:{
        type:String
    },
    facebookLink:{
        type:String
    },
    twitterLink:{
        type:String
    },
    instagramLink:{
        type:String
    },
    pinterestLink:{
        type:String
    },
    youtubeLink:{
        type:String
    },
    snapchatLink:{
        type:String
    }
})

const WebsiteSetting = mongoose.model("WebsiteSetting" , websiteSettingSchema);

module.exports = {WebsiteSetting}