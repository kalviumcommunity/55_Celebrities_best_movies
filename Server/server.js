const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors');
const { userModel } = require('./Schema');
 require('dotenv').config()

 
 const corsOptions ={
     origin:'http://localhost:5174', 
     credentials:true,            //access-control-allow-credentials:true
     optionSuccessStatus:200
 }
 app.use(cors(corsOptions));

let Status = 'disconnected';

const start = async () => {
  try{
    await  mongoose.connect(process.env.MONGODB)
    Status = "Success"
  }catch(err){
    console.error("Failed to connect to DB")
    Status = "error";
  }
};



app.get("/test", async (req, res) => {
  try {
    let ans = await userModel.find({});
    res.send(ans);
  } catch (error) {
    res.send("error");
}
});

app.use('/',routes)

  app.listen(port, () => {
    start()
    console.log(`🚀 server running on PORT: ${port}`);

  });


module.exports = app;