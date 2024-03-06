const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    
CelebritiesName : String,
MoviesName : String,
IMDbRating: Number,
Image: String
});
const userModel =mongoose.model("celebritiesmovies-collections",schema)
module.exports = {userModel};