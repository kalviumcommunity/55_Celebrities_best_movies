const express = require('express')
const router = express.Router()
const {userModel} = require('./Schema')
const Joi = require('joi');
const { Model } = require('./UserSchema')
const jwt = require('jsonwebtoken')


router.use(express.json())

const newDataSchema = Joi.object({
    CelebritiesName : Joi.string().required(),
    MoviesName: Joi.string().required(),
    IMDbRating: Joi.number().required(),
    Image: Joi.string().uri()
});

const updateDataSchema = Joi.object({
    CelebritiesName : Joi.string().required(),
    MoviesName: Joi.string().required(),
    IMDbRating: Joi.number().required(),
    Image: Joi.string().uri()
});



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
        const { error } = newDataSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        console.log(req.body)
        const newData = await userModel.create(req.body);
        console.log(newData)
        res.send(newData);
    } catch (error) {
        console.error(error);
        res.send('Error');
    }
});


router.get('/read/:id', async (req,res) => {
    const _id = req.params.id
    userModel.findById({_id})
    .then(users => res.json(users))
    .catch(err => console.log(err))
})

router.put('/update/:_id', async (req, res) => {
    try {
        const { error } = updateDataSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        let id = req.params._id;
        console.log(id,req.body)
        let updatedData = await userModel.findByIdAndUpdate({_id:id},req.body,{new:true});
        // if (!updatedData) {
        //     return res.status(404).json({ error: 'Data not found' });
        // }
        console.log('Data updated:', updatedData);
        res.status(200).json({ message: 'Data updated successfully', data: updatedData });
    } catch (err) {
        console.error('Error in PUT request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedData = await userModel.findByIdAndDelete(req.params.id); 
        if (!deletedData) {
            return res.status(404).json({ error: 'Data not found' });
        }
        console.log('Data deleted:', deletedData);
        res.status(200).json({ message: 'Data deleted successfully' });
    } catch (err) {
        console.error('Error in DELETE request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/Signup',async(req,res)=>{
    try{
        const user = await Model.create({
            username:req.body.username,
            password:req.body.password
        })
        res.send(user)
    }catch(err){
        console.error(err)
    }
  
})
router.post('/Login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Model.findOne({ username, password });
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid username / password' });
        }

        
        res.status(200).json({ user });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/logout',(req,res)=>{
    res.clearCookie('username')
    res.clearCookie('password')

    res.status(200).json({message:'Logout succesful'})
})

router.post('/auth', async(req,res) => {
    try{const {username,password} = req.body
    const user = {
        "username" : username,
        "password" : password
    }
    const ACCESS_TOKEN = jwt.sign(user,process.env.ACCESS_TOKEN)
    res.cookie('token',ACCESS_TOKEN,{maxAge:365*24*60*60*1000})
    res.json({"acsessToken" : ACCESS_TOKEN})
}catch(err){
    console.error(err)
    res.status(500).json({error:'Internal Server Error'})
}
});

module.exports = router
