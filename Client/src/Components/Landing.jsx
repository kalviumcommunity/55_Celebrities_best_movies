  import React, { useEffect, useState } from 'react';
  import './Landing.css';
  import axios from 'axios';
  import {Link} from 'react-router-dom'

  function Landing() {
    const [movies, setMovies] = useState([]);
    
  

      const fetchData = async () => {
        try { 
          const res = await axios.get("https://celebrities-best-movies.onrender.com/test");
          setMovies(res.data);
          console.log(res.data,"data")
        } catch (err) {
          console.error("Error fetching movies:", err);
        }
      };

      useEffect(() => {
        fetchData();
      }, []);

    return (
      <div>
        <nav className="navbar">
          <div className="container">
            <a href="/" className="logo">StarCinemaVault</a>
            <form className="search-form">
              <input type="text" placeholder="Search movies..." />
              <button type="submit">Search</button>
            </form>
            <ul className="nav-links">
              <li><a href="/" className='home'>Home</a></li>
              <li><a href="/about">About</a></li>
            </ul>
            <div className='form'>
          <Link to="/form">
          <button className='f-btn'>Add Entity</button>
          </Link>
        </div>
          </div>
        
        </nav>
        <img src="./desktop-wallpaper-related-keywords-suggestions-for-movie-theater-backgrounds-1215x734-for-your-mobile-tablet-movie-screen.jpg" alt="" id='bg-img'/>
        <div className="main-content">
          <h1>Welcome to StarCinemaVault.</h1>
          <br />
          <h2>Explore Celebrities and Their Top Movies.</h2>
        </div>
        <div className='card'>
          {movies.map(movie => (
          <div key={movie._id} className='box'>
            <img src={movie.Image}  id='celeb-img' />
            <p className='data' id='celeb'>{movie.CelebritiesName}</p>
            <p className='data' id='leg'>{movie.MoviesName}</p>
            <p className='data' id='imdb'>IMDb Rating: {movie.IMDbRating}</p>
          </div> 
          ))}
        </div>
      </div>
    );
  }

  export default Landing;
