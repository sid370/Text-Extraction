const express=require("express")
const Router=express.Router()
const controller=require("../controllers/login")
const passport=require('passport')

Router.post('/signup',controller.signup)
Router.post('/login',controller.login)

Router.use(passport.initialize())

Router.get('/google',passport.authenticate('google',{scope:['email','profile']}))
Router.get('/google/callback',passport.authenticate('google',{
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failed'
}))

Router.get('/success',controller.success)
Router.get('/failed',controller.fail)

module.exports=Router