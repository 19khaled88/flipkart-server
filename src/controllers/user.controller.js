const User = require("../models/user")
const jwt = require('jsonwebtoken')
const { generateToken } = require("../util/generateToken")
exports.signup = async(req,res)=>{
    try {
        User.findOne({email:req.body.email}).exec((error,user)=>{
            if(user) return res.status(400).json({
                message:'User already registered'
            })
            const _user = new User(req.body)
            _user.save((error, data)=>{
                if(error){
                    return res.status(400).json({
                        message:'Something went wrong'
                    })
                }
                if(data){
                    return res.status(200).json({
                        user:data
                    })
                }
            })
        })
    } catch (error) {
        res.status(400).json({
            message:'User not created'
        })
    }
}

exports.signin=async(req, res)=>{
    try {
        User.findOne({email:req.body.email}).exec((error,user)=>{
            if(error) return res.status(400).json({error})
            if(user){
                if(user.authenticate(req.body.password)){
                    const token = generateToken(user)
                    const {hash_password:pwd, ...userInfo} = user.toObject()
                    return res.status(200).json({
                        token,
                        userInfo
                    })
                }else{
                   return res.status(400).json({
                        message:'Invalid password'
                    })
                }
            }else{
                return res.status(400).json({message:'Something went wrong'})
            }
        })
    } catch (error) {
       return res.status(400).json({
            message:'Server error'
        })
    }
}

exports.test=async(req,res)=>{
    try {
        
       res.send(req.user?.role)
       
    } catch (error) {
        res.send('Invalid user')
    }
}