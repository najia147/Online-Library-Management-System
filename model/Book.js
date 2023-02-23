const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookSchema = new Schema({
    id: String,
    name: String,
    language: String,
    author_id: {
        type: Schema.Types.ObjectId,
        ref: 'authors'
    },
    edition: String,
    pages: Number,
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'categories'
    },
    publishdate: String,
    description: String,
    bookCover: String,
    deleted: {type: Number, default:0}
}, {timestamps: true})

module.exports = mongoose.model('books', bookSchema)