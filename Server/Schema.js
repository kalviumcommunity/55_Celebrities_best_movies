const mongoose = require("mongoose")

const schema = mongoose.Schema({
    
celebrity_name : String,
movie_name : String,
imdb_rating: Number,
img: String
});
const userModel =mongoose.model("CelebritiesBestMovies-Collection",schema)
module.exports = {userModel};