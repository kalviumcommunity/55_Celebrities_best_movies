import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Form.css";

function Form() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        CelebritiesName: "",
        MoviesName: "",
        IMDbRating: "",
        Image: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let data = await axios.post("https://celebrities-best-movies.onrender.com/new", formData);
            console.log(data)
            navigate('/')   
           
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData((prevInfo) => ({
            ...prevInfo,
            [name]: newValue,
        }));
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
                        Add Entity
                    </button>
                </form>
            </div>  
        </div>
    );
}

export default Form;
