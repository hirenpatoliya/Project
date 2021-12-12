const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {signup, signin, signout} = require('../controllers/auth');
const {userSignupValidator,passwordvalidator} = require('../validator/index');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465
    auth: {
        user: '06-0301-2018@student.aau.in', // your gmail email adress
        pass: process.env.GP// your gmail password
    }
});

function verifySmtp(){
    // verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready for send email');
    }
    return true;
});
}
verifySmtp();

const EMAIL = `http://localhost:3000/`;

router.post('/reset-password',(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"User dont exists with that email"})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then((result)=>{
                transporter.sendMail({
                    to:user.email,
                    from:"no-replay@organicmart.com",
                    subject:"Password reset",
                    html:`
                    <p>You requested for password reset</p><br />
                    <h5>click on this <a href="${EMAIL}reset/${token}">link</a> to reset password</h5>
                    `
                })
                res.json({message:"check your email"})
            })

        })
    })
})

router.post('/new-password',passwordvalidator,(req,res)=>{
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Try again session expired"})
        }
          let hashpassword =genPassword(newPassword);
          user.hash=hashpassword.hash;
          user.salt = hashpassword.salt;
          user.resetToken = undefined
          user.expireToken = undefined
          user.save().then((saveduser)=>{
            res.json({message:"password updated success"})
        })
    }).catch(err=>{
        console.log(err)
    })
})

function genPassword(password) {
    if(!password) return '';
    try {
        return crypto.createHmac('sha1', this.salt)
                        .update(password)
                        .digest('hex');
    }catch (err) {
        return "";
    }
}

module.exports = router;