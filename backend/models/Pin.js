const mongoose=require('mongoose')

const PinSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        default:""
    },
    title:{
        type:String,
        require:true,
        min:3,
        defalut:""
    },
    desc:{
        type:String,
        require:true,
        min:3,
        default:""
    },
    rating:{
        type:Number,
        require:true,
        min:0,
        max:5,
        default:0
    },
    lat:{
        type:Number,
        require:true,
        defalut:0.0
    },
    long:{
        type:Number,
        require:true,
        default:0.0
    }


},{timestamps:true}
)

module.exports=mongoose.model("Pin",PinSchema)