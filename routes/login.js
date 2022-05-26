const express = require('express')

const router = express.Router()

const adminUser = require('../models/amdinUser')

router.post('/login' , findUser,(req,res) =>{
    
    res.status(200).json({message :'welcome back hesham'})
   
})

router.post('/register' ,async (req,res) =>{
    const {username : reqUserName, password : reqPassword} = req.body
    try {
        const addUser = await adminUser.create({userName : reqUserName , password : reqPassword})
        res.status(201).json(addUser)
    } catch (error) {
        res.status(400).json({message : error.message})
    }
})

async function findUser(req,res,next){
    const {username : reqUserName, password : reqPassword} = req.body
    const user = await adminUser.findOne({userName : reqUserName , password : reqPassword})
    if (user === null){
        return res.status(401).json({message : 'error in entering info'})
    }

    next()
}

module.exports = router