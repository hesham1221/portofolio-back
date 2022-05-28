const mongoose = require('mongoose')

const WorkSchema = new mongoose.Schema({
    workTitle : {
        type : String,
        required : true
    },
    workPhotos : {
        background : {
            type : String,
        },
        otherPhotos :{
            type :Array
        }
    },
    links :{
        live : {
            type : String,
        },
        github :{
            type : String
        }
    },
    workDescribtion :{
        type : String,
        required : true
    }
},{timestamps : true})

module.exports = mongoose.model('work',WorkSchema)