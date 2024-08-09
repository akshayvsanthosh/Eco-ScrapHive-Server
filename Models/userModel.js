const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    phone:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
    },
    state:{
        type:String,
    },
    buildingName:{
        type:String,
    },
    city:{
        type:String,
    },
    areaName:{
        type:String,
    },
    landMark:{
        type:String,
    },
    role:{
        type:String,
        required:true,
        enum: ['user','admin'],
        default:'user'
    }
})

const users = mongoose.model("users",userSchema)

module.exports=users