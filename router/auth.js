const router  = require('express').Router()
const users = require('../models/users');
const bcrypt = require('bcrypt')
//Reijester

router.post("/register",async (req,res)=>{

    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password,salt)
        const newUser = new users({
            username:req.body.username,
            email:req.body.email,
            password:hashedPass,
        })
        const user = await newUser.save()
        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }

})
router.post('/login',async (req,res)=>{
    try{
        const userfind = await users.findOne({username:req.body.username})
        !userfind && res.status(400).json("wrong")
        const validated = await bcrypt.compare(req.body.password,userfind.password)
        !validated && res.status(400).json('wrong')
        const {password,...other} = userfind._doc
        res.status(200).json(other)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router

