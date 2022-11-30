import { Cancel, Room } from '@mui/icons-material'
import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import './register.css'
import axios from 'axios'

export default function Register({setShowRegister}) {
    const [success,setSuccess]=useState(false)
    const [error,setError]=useState(false)
    const nameref=useRef()
    const emailref=useRef()
    const passwordref=useRef()

    const handleSubmit=async (e)=>{
        e.preventDefault()
        const newUser={
            username:nameref.current.value,
            email:emailref.current.value,
            password:passwordref.current.value,
        }
        try{
            await axios.post('/users/register',newUser)
            setError(false)
            setSuccess(true)
        }
        catch(err){
            setError(true)
        }
    }

  return (
    <div className='registerContainer'>
        <div className="logo">
            <Room/>
            TravelPin
        </div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="username" ref={nameref}/>
            <input type="email" placeholder="email" ref={emailref}/>
            <input type="password" placeholder="password" ref={passwordref}/>
            <button className='registerButton'>Register</button>
            {success && 
            <span className='success'>Successful.You can logIn now!</span>
            }   {error && 
            <span className='failure'>something went wrong</span>
            }
        </form>
        <Cancel className='registerCancel' onClick={()=>setShowRegister(false)}/>
    </div>
  )
}
