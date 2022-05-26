const mongoose = require('mongoose')

const adminUserSchema = new mongoose.Schema({
    userName :{
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    }
})

module.exports = mongoose.model('adminUser',adminUserSchema)