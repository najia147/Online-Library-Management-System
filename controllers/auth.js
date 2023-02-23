const bcrypt = require('bcryptjs')
const { request } = require('express')

const User = require('../model/User')

exports.getLogin = (req, res) => {
    res.render('admin/login', {
        activeLink: "login",
        mainTitle: "Login to Library Management System"
    })
}

exports.postLogin = (req, res) => {

    const email = req.body.email
    const password = req.body.password

    User.findOne({email: email})
    .then(userDoc => {
        if(!userDoc) {
           return res.redirect('/admin/')
        }
        bcrypt.compare(password, userDoc.password)
        .then(doMatch => {
            if(doMatch) {
                req.session.isLoggedIn = true
                req.session.user = userDoc
                return req.session.save(err => {
                    console.log(err)
                    res.redirect('/admin/book-inventory')
                })
            }
            res.redirect('/admin/')
        })
        .catch(err => console.log(err))
    })
}

exports.postLogout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/admin/')
    })
}

exports.getSignup = (req, res) => {
    res.render('admin/signup', {
        activeLink: "signup",
        mainTitle: "SignUp to Library Management System"
    })
}

exports.postSignup = (req, res) => {
    const fullname = req.body.fullname
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword

    User.findOne({email: email})
    .then(userDoc => {
        if(userDoc) {
           return res.redirect('/admin/signup')
        }

        return bcrypt.hash(password, 12)
        .then(hashPassword => {
            const user = new User({
                fullname: fullname,
                email: email,
                password: hashPassword
            })
            return user.save()
        })
        .then(()=>{
            res.redirect('/admin/')
        })
    })
    .catch(err => console.log(err))
}