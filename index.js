const express = require("express");

const App = express()
const multer = require('multer')
const mongoose = require('mongoose');
const Auto = require('./router/auth')
const test = require('./router/test')
const Users = require('./router/users')
const Post = require('./router/posts')
const Category = require('./models/catgory');
App.use(express.json())
mongoose.connect('mongodb://localhost:27017/example-mongo').then(console.log('conect mongo')).catch(err=>{
    console.log(err);
})

const storege = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"assets")
    },
    filename:(req,file,cb)=>{
        cb(null,"test.png") //handel whit front end axios 
    }
})

const upload = multer({storage:storege})
App.post('/api/upload',upload.single("file"),(req,res)=>{
    res.status(200).json('file has been upload')
})

App.use("/api",Auto)
App.use('/api/t',test)
App.use('/api/users',Users)
App.use('/api/post',Post)
App.use('/api/category',Category)
App.listen(3000,()=>{
    console.log('this server is runing');
})
