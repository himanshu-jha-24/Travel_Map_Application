import React from 'react'
import Map,{Marker,Popup} from 'react-map-gl'
import { useState,useEffect } from 'react'
import './app.css'
import { Room, Star } from '@mui/icons-material'
import axios from 'axios'
import {format} from 'timeago.js'
import Register from '../src/components/Register'
import Login from '../src/components/Login'

export default function App() {
  const myStorage=window.localStorage
  const [currUser,setCurrUser]=useState(myStorage.getItem("user"))
  const [pins,setPins]=useState([])
  const [currentPlaceId,setCurrentPlaceId]=useState(null)
  const [newPlace,setNewPlace]=useState(null)
  const [title,setTitle]=useState(null)
  const [desc,setDesc]=useState(null)
  const [rating,setRating]=useState(0)
  const [showRegister,setShowRegister]=useState(false)
  const [showLogin,setShowLogin]=useState(false)
  const [viewState, setViewState] =useState({
    longitude: 2.294694,
    latitude: 48.858093,
    zoom: 3.5,
    width:"100vw",
    height:"100vh"
  })

  useEffect(()=>{
    const getPins=async ()=>{
      try{
        const res=await axios.get('/pins')
        setPins(res.data)
        console.log(res.data)
      }
      catch(err){
        console.log(err)
      }
    }
    getPins()
  },[])

  const handleMarkerClick=(id,lat,long)=>{
    setCurrentPlaceId(id)
    setViewState({...viewState,latitude:lat,longitude:long})
  }

  const handleAddClick=(e)=>{
    const [long,lat]=e.lngLat
    setNewPlace({
      long,lat
    })
  }

  const handleSubmit= async (e)=>{
    e.preventDefault()
    const newPin={
      username:currUser,
      title,
      desc,
      rating,
      lat:newPlace.lat,
      long:newPlace.long
    }
    try{
      const res=await axios.post('/pins',newPin)
      setPins([...pins,res.data])
      setNewPlace(null)
    }
    catch(err){
      console.log(err)
    }
  }

  const handleLogOut=()=>{
    myStorage.removeItem("user")
    setCurrUser(null)
  }

  return (
    <div className='App'>
      <Map className="mapContainer"
        {...viewState}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={nextViewPort => setViewState(nextViewPort)}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onDblClick={handleAddClick}
        transitionDuration="200"
      >
        {pins.map(p=>(
        <>
          <Marker latitude={p.lat} longitude={p.long}
          offsetLeft={-viewState.zoom*2.5} offsetTop={-viewState.zoom*5}
          >
          <Room onClick={()=>handleMarkerClick(p._id,p.lat,p.long)} style={{fontSize:viewState.zoom*5,
            color:p.username===currUser?"tomato":"slateblue",cursor:"pointer"}} />
        </Marker>
        {p._id===currentPlaceId &&
        <Popup
        latitude={p.lat}
        longitude={p.long}
        closeButton={true}
        closeOnClick={false}
        onClose={()=>setCurrentPlaceId(null)}
        anchor="left">
        <div className='card'>
        <label>Place</label>
        <h4 className='place'>{p.title}</h4>
        <label>Review</label>
        <p className='desc'>{p.desc}</p>
        <label>Rating</label>
        <div className='stars'>
        {Array(p.rating).fill(<Star className='star'/>)}
        </div>
        <label>Info</label>
        <span className="username">created by <b>{p.username}</b></span>
        <span className="date">{format(p.createdAt)}</span>
        </div>
      </Popup>
        }
      </>
      ))}
      {newPlace &&
      <Popup
      latitude={newPlace.lat}
      longitude={newPlace.long}
      closeButton={true}
      closeOnClick={false}
      onClose={()=>setNewPlace(null)}
      anchor="left">
      <div>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input placeholder='give a title' 
        onChange={(e)=>setTitle(e.target.value)}/>
        <label>Review</label>
        <textarea placeholder='tell us something about this place'
          onChange={(e)=>setDesc(e.target.value)}/>
        <label>Rating</label>
        <select onChange={(e)=>setRating(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button className='submitButton' type='submit'>Add Pin</button>
      </form>
    </div>
    </Popup>
    }
      {currUser?(
        <button className='button logOut' onClick={handleLogOut}>Log Out</button>
      ):(
      <div className='buttons'>
        <button className='button logIn' onClick={()=>setShowLogin(true)}>Log In</button>
        <button className='button register'  onClick={()=>setShowRegister(true)}>Register</button>
      </div>
      )}
      {showRegister &&<Register setShowRegister={setShowRegister}/>}
      {showLogin && <Login setShowLogin={setShowLogin}
       myStorage={myStorage}
       setCurrUser={setCurrUser}/>
       }
      </Map> 
  </div>
  )
}
