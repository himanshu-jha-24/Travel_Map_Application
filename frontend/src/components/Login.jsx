import { Cancel, Room } from '@mui/icons-material'
import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import './login.css'
import axios from 'axios'

export default function Login({setShowLogin,myStorage,setCurrUser}) {
    const [error,setError]=useState(false)
    const nameref=useRef()
    const passwordref=useRef()

    const handleSubmit=async (e)=>{
        e.preventDefault()
        const user={
            username:nameref.current.value,
            password:passwordref.current.value,
        }
        try{
            const res=await axios.post('/users/login',user)
            myStorage.setItem("user",res.data.username)
            setCurrUser(res.data.username)
            setShowLogin(false)
            setError(false)
        }
        catch(err){
            setError(true)
        }
    }

  return (
    <div className='loginContainer'>
        <div className="logo">
            <Room/>
            TravelPin
        </div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="username" ref={nameref}/>
            <input type="password" placeholder="password" ref={passwordref}/>
            <button className='loginButton'>Log In</button>
            {error && 
            <span className='failure'>Something went wrong</span>
            }
        </form>
        <Cancel className='loginCancel' onClick={()=>setShowLogin(false)}/>
    </div>
  )
}
