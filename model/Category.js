const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: String,
    deleted: {type:Number, default:0}
}, {timestamps: true})

module.exports = mongoose.model('categories', categorySchema)