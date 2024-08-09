const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    itemCategory:{
        type:String,
        required:true
    },
    itemImage:{
        type:String,
        required:true
    },
    itemName:{
        type:String,
        required:true,
        unique:true
    },
    itemPrice:{
        type:String,
        required:true
    }
})

const items = mongoose.model("items",itemSchema)

module.exports=items