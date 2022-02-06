const router = require('express').Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')
const Post = require('../models/posts')
//Update
router.put('/:id',async(req,res)=>{
    if(req.body.userId === req.params.id){
        if(req.body.password){ //change password 
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password,salt)
        }
        try{
const updateUser = await User.findByIdAndUpdate(req.params.id,{ //change all date of id 
    $set:req.body,
})
res.status(200).json(updateUser)
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(401).json("you can update only accunt")
    }
})


//Delete

router.delete('/:id',async(req,res)=>{
    if(req.body.userId === req.params.id){
        try{
            const user = await User.findById(req.params.id)
            try{
await Post.deleteMany({username:user.username})
await User.findByIdAndDelete(req.params.id)
res.status(200).json('user has been deleted...')
            }catch(err){
                res.status(500).json(err)
            }
        }catch(err){
res.status(404).json('not found user')
        }
    }
})




module.exports = router