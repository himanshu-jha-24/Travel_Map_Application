const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:20,
        unique:true,
        default:""
    },
    email:{
        type:String,
        require:true,
        max:40,
        unique:true,
        default:""
    },
    password:{
        type:String,
        require:true,
        min:6,
        default:111111
    }
},{timestamps:true}
)

module.exports=mongoose.model("User",UserSchema)