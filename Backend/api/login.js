const express=require("express")
const Router=express.Router()
const controller=require("../controllers/login")
const passport=require('passport')
const ExpressBrute =require('express-brute')

var store=new ExpressBrute.MemoryStore()
var bruteforce=new ExpressBrute(store,this.options={
    minWait: 1000
})

Router.post('/signup',controller.signup)
Router.post('/login',bruteforce.prevent,controller.login)

Router.use(passport.initialize())

Router.get('/google',passport.authenticate('google',{scope:['email','profile']}))
Router.get('/google/callback',passport.authenticate('google',{
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failed'
}))

Router.get('/success',controller.success)
Router.get('/failed',controller.fail)

Router.use((req,res,next)=>{
    res.status(404).json({
        status:404,
        message:'Page Not Found'
    })
})

module.exports=Router