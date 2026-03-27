import React, {useEffect, useRef, useState} from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import {Link} from 'react-router-dom'
const TItleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTRiYmRhYzRjYmJmZTBiMzJiY2I2Njg0NDQwOWZhYiIsIm5iZiI6MTc2NTEwNDYxMi4zODUsInN1YiI6IjY5MzU1YmU0MGZhMTkyZTE3ZTI0M2E5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gu1Ag3Umou8HqAt8DvYUUd6YLaTp3Vbk1k16UG5sTv4'
  }
};



const handlewheel =(event) =>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
}
useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => {
    console.log("Data for" + category, res);
    setApiData(res.results);
})
  .catch(err => console.error(err)); 


  cardsRef.current.addEventListener('wheel', handlewheel);


},[])

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}> 
        {apiData.map((card, index)=>{
        return <Link to={`/player/${card.id}`} className='card' key={index}>
          <img src={`https://image.tmdb.org/t/p/w500`+ card.backdrop_path} alt="" />
          <p>{card.original_title}</p>
          </Link>
      })}
      </div>
     
    </div>
  )
}

export default TItleCards
