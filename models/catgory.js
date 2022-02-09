const mongo  = require("mongoose");

const CatgoryScema = new mongo.Schema({
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:false
    },
    username:{
        type:String,
        required:true
    }
},
{timestamps:true}

)


module.exports = mongo.model("Catgory",CatgoryScema)