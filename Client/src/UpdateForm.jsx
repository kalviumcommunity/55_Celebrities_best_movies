import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import "./Form.css";
import { useEffect } from 'react';

function UpdateForm() {
    const navigate = useNavigate();
    const { id } = useParams();

const [formData, setFormData] = useState({
    CelebritiesName: "",
    MoviesName: "",
    IMDbRating: "",
    Image: "",
});

useEffect(() => {
    if(id) { // Ensure there is an id to fetch data for
        axios.get(`https://celebrities-best-movies.onrender.com/read/${id}`)
            .then((response) => {
                setFormData({
                    CelebritiesName: response.data.CelebritiesName,
                    MoviesName: response.data.MoviesName,
                    IMDbRating: response.data.IMDbRating,
                    Image: response.data.Image
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }
}, [id]);


const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
    }));
};

const handleSubmit = (event) => {
    console.log(id)
    console.log(formData)
    event.preventDefault();
    axios.put(`https://celebrities-best-movies.onrender.com/update/${id}`, formData)
        .then((res) => {
            console.log(res)
            navigate('/'); // Adjust the navigate path as per your application's routing
        })
        .catch((error) => {
            console.error(error);
        });
};


return (
    <div className='cont'>
        <img src="./desktop-wallpaper-related-keywords-suggestions-for-movie-theater-backgrounds-1215x734-for-your-mobile-tablet-movie-screen.jpg" alt="" id='bg-img' />
        <div className='content'>
            <form onSubmit={handleSubmit}>
                <label id='details'>
                    Celebrities Name:<br />
                    <input
                        type='text'
                        name='CelebritiesName'
                        value={formData.CelebritiesName}
                        onChange={handleChange}
                    />
                </label><br />
                <label>
                    Movies Name:<br />
                    <input
                        type='text'
                        name='MoviesName'
                        value={formData.MoviesName}
                        onChange={handleChange}
                    />
                </label><br />
                <label>
                    IMDb Rating:<br />
                    <input
                        type='number'
                        name='IMDbRating'
                        value={formData.IMDbRating}
                        onChange={handleChange}
                    />
                </label><br />
                <label>
                    Image:<br />
                    <input
                        type='text'
                        name='Image'
                        value={formData.Image}
                        onChange={handleChange}
                    />
                </label><br />
                <button className='submit' type="submit">
                    Update
                </button>
            </form>
            <Link to="/"></Link>
        </div>  
    </div>
);
}

export default UpdateForm;
