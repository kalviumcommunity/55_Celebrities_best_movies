const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
dotenv.config()

const corsOrigin ={
  origin:'http://localhost:5177', //or whatever port your frontend is using
  credentials:true,            
  optionSuccessStatus:200
}
app.use(cors(corsOrigin));

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

const stop = async () => {
  await mongoose.disconnect();
  Status = "closed"
}

app.get('/', (req, res) => {
  res.send(Status);
});

app.use('/',routes)

  app.listen(port, () => {
    start()
    console.log(`🚀 server running on PORT: ${port}`);

  });


module.exports = app;