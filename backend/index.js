const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const app=express()
const pinRoute=require('./routes/pins')
const userRoute=require('./routes/users')


dotenv.config()

 mongoose.connect(
    // process.env.MONGO_URL,
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    ()=>{
    console.log("MongoDB connected!")
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) 

app.use("/api/pins",pinRoute)
app.use("/api/users",userRoute)


app.listen(8000,()=>{
    console.log('backend server is running')
})

