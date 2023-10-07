const jwt = require('jsonwebtoken');
const {Admin} = require('../Models/Admin/AdminModel');

const adminProtect = (req,res,next) => {
    const {authorization} = req.headers
    if(!authorization)
    {
        return res.status(401).json({error:"you must be logged in!"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,'abcdefghijklmnop',(err,payload) => {
        if(err){
            return res.status(401).json({error:"You must be logged in!"})
        }
        const {adminId} = payload
        // console.log(adminId)
        Admin.findById(adminId).then(admindata => {
            req.admin = admindata
            next()
        })
    })
}

module.exports = {adminProtect}