const mongo  = require("mongoose");

const UserScema = new mongo.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
        },
        profilepic:{
            type:String,
            default:""
        }
},
{timestamps:true}

)


module.exports = mongo.model("User",UserScema)