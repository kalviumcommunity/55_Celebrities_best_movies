const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    
CelebritiesName : String,
MoviesName : String,
IMDbRating: Number,
Image: String,
created_by: String

});
const userModel =mongoose.model("celebritiesmovies-collection",schema)
module.exports = {userModel};