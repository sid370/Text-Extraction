const express = require("express")
const app = express()
const mongoose = require("mongoose")
const User = require("../models/users")
const bcrypt = require("bcrypt")
const jwt= require("jsonwebtoken")
const passport=require("passport")
const GoogleStrategy=require("passport-google-oauth20").Strategy

exports.signup = (req, res, next) => {
    User.find({ username: req.body.username })
        .exec()
        .then((resp) => {
            if (resp.length > 1) {
                return res.status(500).json({
                    status: 500,
                    message: "Username Unavailable"
                })
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            status: 500,
                            message: "Some error ocurred. Please Change the password and try again",
                            password: req.body.password,
                            err: err
                        })
                    }
                    else {
                        const newUser = new User({
                            _id:mongoose.Types.ObjectId(),
                            name: req.body.name,
                            username: req.body.username,
                            phone: req.body.phone,
                            email: req.body.email,
                            password: hash,
                            address: req.body.address,
                            gender: req.body.gender,
                            mode: "signup"
                        });
                        newUser.save().then((resp) => {
                            res.status(200).json({
                                status: 200,
                                message: "Created Successfully"
                            })
                        }).catch(err=>{
                            res.status(500).json({
                                status:500,
                                message: "Some Error Occurred",
                                err:err
                            })
                        })
                    }
                })
            }
        })
}

exports.login=(req,res,next)=>{
    
    User.find({username: req.body.username})
    .exec()
    .then(resp=>{
        if (resp.length<1){
            res.status(404).json({
                status:404,
                message:"Account Not Found"
            })
        }
        else{
            bcrypt.compare(req.body.password,resp[0].password,(err,response)=>{
                if (err)
                    res.status(500).json({status:500, message:"Authentication Failed"})
                else if(response){
                    const token=jwt.sign({email:resp[0].email, date: Date.now()},"kai78po",{expiresIn:"1h"});
                    return res.status(200).json({
                        status:200,
                        message: "login successful",
                        token: token
                    });
                }
                else{
                    res.status(500).json({
                        status: 500,
                        message: "Incorrect Password"
                    })
                }
            })
        }
    })
    .catch(err=>res.status(500).json({status:500,err:err}))
}

exports.success=((req,res,next)=>{
    res.status(200).json({
        status: 200,
        message: 'Login Successful'
    })
})

exports.fail=(req,res,next)=>{
    res.status(500).json({
        status:500,
        message: "Login Failed"
    })
}

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
    new GoogleStrategy({
        clientID:"83504346181-sqpaqf3b05tp2qhofndlf2b3p91t37lq.apps.googleusercontent.com",
        clientSecret:"wz2HX_E97FUfnI6mjD0MQlFP",
        callbackURL:"http://localhost:3000/auth/google/callback"
        },
        (accessToken,refreshToken,profile,done)=>{
            User.find({_id:profile.id})
            .exec()
            .then((resp)=>{
                console.log(profile)
                if (resp.length>1){
                    console.log("Welcome Back")
                    done(null,profile);
                }else{
                    const newUser=new User({
                        _id:profile.id,
                        name:profile.displayName,
                        username:profile.displayName,
                        phone:'',
                        email:profile.emails[0].value,
                        address:'',
                        gender:'',
                        mode:'google'
                    })
                    newUser.save().then(resp=>console.log("Profile Added")).catch(err=>console.log(err))
                    done(null,profile);
                }
            })
            .catch(err=>console.log(err))
        }
    )
)
