const mongo  = require("mongoose");

const PostScema = new mongo.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
        required:false
        },
        username:{
            type:String,
            required:true
        },
        cargory:{
            type:Array,
            required:false
        }
},
{timestamps:true}

)


module.exports = mongo.model("Post",PostScema)