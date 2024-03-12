  import React, { useEffect, useState } from 'react';
  import './Landing.css';
  import axios from 'axios';

  function Landing() {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
      fetchData();
    }, []);
  

      const fetchData = async () => {
        try {
          const res = await axios.get("https://celebrities-best-movies.onrender.com/read");
          setMovies(res.data);
          console.log(res.data)
        } catch (err) {
          console.error("Error fetching movies:", err);
        }
      };

    

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
          <div key={movie.id} className='box'>
            <img src={movie.Image}  id='celeb-img' key={movie.id}/>
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
