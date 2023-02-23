const mongoose = require('mongoose')

const Schema = mongoose.Schema

const authorSchema = new Schema({
    id: Number,
    profile: String,
    fullname: String,
    dob: String,
    email: String,
    linkedin: String,
    twitter: String,
    facebook: String,
    bio: String,
    deleted: {type: Number, default: 0}
}, { timestamps: true })

module.exports = mongoose.model('authors', authorSchema)