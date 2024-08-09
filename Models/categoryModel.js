const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    categoryImage:{
        type:String,
        required:true
    },
    categoryName:{
        type:String,
        required:true,
        unique:true
    },
    categoryItems:{
        type:String,
        required:true
    }
})

const categories = mongoose.model("categories",categorySchema)
module.exports=categories