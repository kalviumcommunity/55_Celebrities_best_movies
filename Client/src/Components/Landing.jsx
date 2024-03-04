// Import necessary dependencies
import React from 'react';
import './Landing.css'; // Importing your CSS file

// Create a functional component for Landing
function Landing() {
  return (
    <div>
      {/* Navbar */}
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

      {/* Main content section */}
      <div className="main-content">
        <h1>Welcome to StarCinemaVault.</h1>
        <br />
        <h2 >Explore Celebrities and Their Top Movies.</h2>
        {/* Add more content here */}
      </div>
    </div>
  );
}

// Export the Landing component
export default Landing;