const express = require('express');
const router = express.Router();
const Alien=require('../model/alien');
router.get('/',async (req,res)=>{
    try{
        const aliens = await Alien.find()
        res.json(aliens);
    }catch(err){
        res.send()
    }
    res.send('Get Requests');
})

router.get('/:id',async (req,res)=>{
    try{
        const aliens = await Alien.findById(req.params.id)
        res.json(aliens);
    }catch(err){
        res.send()
    }
    res.send('Get Requests');
})

router.post('/',async(req,res)=>{
    const alien=new Alien({
        name:req.body.name,
        tech:req.body.tech,
        sub:req.body.sub
    })
    console.log(alien)
    try{
        const data=await alien.save() 
        res.json(data)
    }catch(err){
        res.send('Error')
    }
})


router.patch('/:id',async (req,res)=>{
    try{
        const alien = await Alien.findById(req.params.id)
        alien.sub=req.body.sub
        const data=await alien.save()
        res.json(data);
    }catch(err){
        res.send()
    }
})

module.exports=router