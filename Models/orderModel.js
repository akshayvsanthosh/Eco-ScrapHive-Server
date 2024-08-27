const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    itemNames: {
        type: String,
        required: true,
    },
    address:{
        userName: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        buildingName: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        areaName: {
            type: String,
            required: true
        },
        landMark: {
            type: String,
            required: true
        },
        addressType: {
            type: String,
        }
    },
    price:{
        type:Number
    },
    orderStatus:{
        type:Number,
    }
})

const orders = mongoose.model("orders",orderSchema)
module.exports=orders