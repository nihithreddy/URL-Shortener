const mongoose = require("mongoose")
const shortid = require("shortid")

//Create a Schema for the table which has two columns one for full URL and one for short URL
const UrlSchema = new mongoose.Schema({
    full:{
        type: String,
        required: true
    },
    short:{
        type: String,
        required: true,
        default: () => shortid.generate()
    }
})

//Exporting the Database
module.exports = mongoose.model("ShortUrl",UrlSchema)