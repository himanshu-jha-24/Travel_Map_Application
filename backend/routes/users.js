const router=require('express').Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')


//register
router.post('/register', async(req,res)=>{
    try{
        //create hashd password
        const salt=await bcrypt.genSalt(10)
        req.body.password =await bcrypt.hash(req.body.password,salt)
        //create new user
        const newUser= new User(req.body)
        //save user
        const user=await newUser.save()
        res.status(200).json(user._id)
    }
    catch(err){
        res.status(500).json(err)
        console.log(err)
    }
})

//login
router.post('/login',async(req,res)=>{
    try{
        const user=await User.findOne({username:req.body.username})
        !user && res.status(400).json("username or password is incorret")

        const validpassword=await bcrypt.compareSync(
            req.body.password,user.password
        )
        !validpassword && res.status(400).json('username or password is incorrect')

        validpassword && res.status(200).json({_id:user._id,username:user.username})
    }
    catch(err){
        res.status(500).json(err)
        console.log(err)
    }
})

module.exports=router