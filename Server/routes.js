const express = require('express')
const router = express.Router()
// const Schema = require('./Schema')
const {userModel} = require('./Schema')

router.use(express.json())

// router.get('/get',(req,res)=>{
//     res.send('get request')
// })

router.get('/read', async (req, res) => {
    try {
        const newData = await userModel.find().maxTimeMS(20000).exec(); // Retrieving all food combinations from the database
        res.json(newData); // Sending the retrieved data as a JSON response
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

// router.get('/read', async (req, res) => {
//     try {
//         const newData = await userModel.find(); // Retrieving all food combinations from the database
//         res.json(newData); // Sending the retrieved data as a JSON response
//     } catch (err) {
//         console.error('Error in GET request:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
module.exports = router
