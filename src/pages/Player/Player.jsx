import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'


const Player = () => {

  const {id}= useParams();
  const navigate = useNavigate();

  const [apiData, setapiData]= useState({
    name:"",
    key: "",
    published_at:"",
    typeof:""

  })

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTRiYmRhYzRjYmJmZTBiMzJiY2I2Njg0NDQwOWZhYiIsIm5iZiI6MTc2NTEwNDYxMi4zODUsInN1YiI6IjY5MzU1YmU0MGZhMTkyZTE3ZTI0M2E5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gu1Ag3Umou8HqAt8DvYUUd6YLaTp3Vbk1k16UG5sTv4'
  }
};

useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setapiData(res.results[0]))
  .catch(err => console.error(err));
},[])


  return (
    <div className='player'>
      {/* this page is for creating the player which will be opening once we click on a titlecard */}

      <img src={back_arrow_icon} alt=""  onClick={()=>{navigate(-2)}}/>
      <iframe width='90%' height='90%'
       src={`https://www.youtube.com/embed/${apiData.key}`}
        frameborder="0"
       title='trailer'allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
        
      </div>
    </div>
  )
}

export default Player
