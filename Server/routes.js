const express = require('express')
const router = express.Router()
const {userModel} = require('./Schema')
const cors = require('cors');

const corsOptions ={
    origin:'https://client-oat9qj8aj-ayush-tiwaris-projects-918925cc.vercel.app/', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
router.use(cors(corsOptions));


router.use(express.json())


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

router.post('/new', async (req, res) => {
    try {
        const newData = await userModel.create(req.body);
        console.log(newData)
        res.send(newData);
    } catch (error) {
        console.error(error);
        res.send('Error');
    }
});

module.exports = router
