const express = require('express')
const router = express.Router()
import { userModel } from './Schema'

router.use(express.json())

router.get('/get',(req,res)=>{
    res.send('get request')
})

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

router.post('/movies',async(req,res)=>{
   try{
    const newData = await userModel.find({})
   }catch(err){
        console.error(err)
   }
})
module.exports = router
