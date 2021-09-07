const express = require('express');
const router = express.Router();
const User=require('../model/user');
router.get('/',async (req,res)=>{
    try{
        const users = await User.find()
        res.json(users);
    }catch(err){
        res.send()
    }
    res.send('Get Requests');
})

router.get('/:id',async (req,res)=>{
    try{
        const users = await User.findById(req.params.id)
        res.json(users);
    }catch(err){
        res.send()
    }
    res.send('Get Requests');
})

router.post('/',async(req,res)=>{
    const user=new User({
        u_id:req.body.u_id,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password,
        usertype:req.body.usertype
    })
    console.log(user)
    try{
        const data=await user.save() 
        res.json(data)
    }catch(err){
        res.send('Error')
    }
})


router.patch('/:id',async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        alien.sub=req.body.sub
        const data=await user.save()
        res.json(data);
    }catch(err){
        res.send()
    }
})

module.exports=router