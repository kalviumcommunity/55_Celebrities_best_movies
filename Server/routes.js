const express = require('express')
const router = express.Router()
const cors = require('cors')
const {userModel} = require('./Schema')

const corsOrigin ={
    origin:'http://localhost:5177', //or whatever port your frontend is using
    credentials:true,            
    optionSuccessStatus:200
}
router.use(cors(corsOrigin));

router.use(express.json())

// app.use(cors())
router.get('/read', async (req, res) => {
    try {
        const newData = await userModel.find().maxTimeMS(20000).exec(); 
        res.json(newData); 
    } catch (err) {
        console.error('Error in GET request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/post',(req,res)=>{
    console.log(req.body)
    res.json(req.body)
})

router.put('/put',(req,res)=>{
    res.send("put request")
})

router.delete('/delete',(req,res)=>{
    res.send("delete request")
})


module.exports = router
