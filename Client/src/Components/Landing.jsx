import React, { useEffect, useState } from 'react';
import './Landing.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Landing() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedUser, setSelectedUser] = useState("All");
  const [uniqueUsers, setUniqueUsers] = useState(["All"]);

  const fetchData = async () => {
    try { 
      const res = await axios.get("https://celebrities-best-movies.onrender.com/test");
      setMovies(res.data);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  useEffect(() => {
    fetchData();

    // Check login status
    const loginStatus = sessionStorage.getItem('login');
    setIsLoggedIn(loginStatus);

  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://celebrities-best-movies.onrender.com/test");
        const users = ["All", ...new Set(res.data.map(item => item.created_by).filter(Boolean))];
        setUniqueUsers(users);
      } catch (err) {
        console.log(err);
        setError("Error fetching data. Please try again.");
      }
    };

    fetchData();

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

  const filteredMovies = movies.filter(item => selectedUser === "All" || item.created_by === selectedUser);

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <a href="/" className="logo">StarCinemaVault</a>
          <form className="search-form">
            <input type="text" placeholder="Search movies..." />
            <button type="submit">Search</button>
          </form>
          <ul className="nav-btns">
            {isLoggedIn ? (
              <>
                <button className='logout' onClick={handleLogout}>Logout</button>
                <div className='form'>
                  <Link to="/form">
                    <button className='f-btn'>Add Entity</button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to="/Login"><button className='login'>Login</button></Link>
                <Link to="/Signup"><button className='signup'>Signup</button></Link>
              </>
            )}
          </ul>
        </div>
      </nav>
      <img src="./desktop-wallpaper-related-keywords-suggestions-for-movie-theater-backgrounds-1215x734-for-your-mobile-tablet-movie-screen.jpg" alt="" id='bg-img'/>
      <div className="main-content">
        <h1>Welcome to StarCinemaVault.</h1>
        <br />
        <h2>Explore Celebrities and Their Top Movies.</h2>
        {isLoggedIn && (
          <div className="filter">
            <select id='drop' value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
              {uniqueUsers.map(user => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="container">
        

        <div className='card'>
          {filteredMovies.map(movie => (
            <div key={movie._id} className='box'>
              <img src={movie.Image}  id='celeb-img' />
              <p className='data' id='celeb'>{movie.CelebritiesName}</p>
              <p className='data' id='leg'>{movie.MoviesName}</p>
              <p className='data' id='imdb'>IMDb Rating: {movie.IMDbRating}</p>
              <div className="btns">
                <Link to={`/update/${movie._id}`}>
                  <button className='update'>Update</button>
                </Link>
                <button className='delete' onClick={() => deleteItem(movie._id)}>Delete</button>
              </div>
            </div> 
          ))}
        </div>
      </div>
    </div>
  );
}

export default Landing;
