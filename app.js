const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const path = require('path')
const mongoose = require('mongoose')
const multer = require('multer')
const session = require('express-session')
const MongodbStore = require('connect-mongodb-session')(session)
const csrf = require('csurf')

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
})

const app = express()

const store = new MongodbStore({
    uri: 'mongodb://localhost:27017/LibraryManagementSystem',
    collection: 'sessions'
})

app.use(session({
    secret:"topSecure",
    resave: false,
    saveUninitialized: false,
    store: store
}))

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: false}))
app.use(multer({storage: fileStorage}).fields([
    {
        name: 'bookCover',
        maxCount: 1
    },
    {
        name: 'profile',
        maxCount: 1
    }
]))
app.use(express.static(path.join(__dirname, "public")))
app.use("/images", express.static(path.join(__dirname, "images")))

app.use(csrf())

app.use((req, res, next) => {
    isAuthenticated= req.session.isLoggedIn
    csrfToken = req.csrfToken()
    next() 
})

// route
const clientRoute = require('./routes/client')
const adminRoute = require('./routes/admin')
const authRoute = require('./routes/auth')
app.use(clientRoute.route)
app.use("/admin", adminRoute.route)
app.use("/admin", authRoute.route)

mongoose.connect('mongodb://localhost:27017/LibraryManagementSystem')
.then(result => {
    app.listen('3000')
    console.log('connected to DB successfully.')
})
.catch(err => console.log(err))
