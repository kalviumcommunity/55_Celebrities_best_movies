import React, { useEffect, useState } from 'react';
import './Landing.css';
import axios from 'axios';
import { Link } from 'react-router-dom'

function Landing() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  useEffect(() => {
    // Check login status
    const loginStatus = sessionStorage.getItem('login');
    setIsLoggedIn(!!loginStatus);
  }, []);

  const deleteItem = async (id) => {
    try {
      await axios.delete(`https://celebrities-best-movies.onrender.com/delete/${id}`);
      setMovies(prevState => prevState.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
      setError("Error deleting data. Please try again.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('login');
    setIsLoggedIn(false);
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
            {isLoggedIn ? (
              <>
                <button className='logout' onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/Login"><button className='login'>Login</button></Link>
                <Link to="/Signup"><button className='signup'>Signup</button></Link>
              </>
            )}
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
            <div className="btns">
              {/* Pass food._id as id to deleteItem */}
              <Link to={`/update/${movie._id}`}>
                <button className='update'>Update</button>
              </Link>
              <button className='delete' onClick={() => deleteItem(movie._id)}>Delete</button>
            </div>
          </div> 
        ))}
      </div>
    </div>
  );
}

export default Landing;
