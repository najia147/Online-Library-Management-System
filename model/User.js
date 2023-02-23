const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    fullname: String,
    email: String,
    password: String,
    deleted: {type:Number, default:0}
}, {timestamps: true})

module.exports = mongoose.model('users', userSchema)