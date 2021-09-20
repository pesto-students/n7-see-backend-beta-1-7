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
    // res.send('Get Requests');
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

    try{
        const user=new User({
            u_id:req.body.u_id,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:req.body.password,
            usertype:req.body.usertype
        });
        console.log(user)
        const data=await user.save() 
        res.status(200).json({
            statuscode:"200",
            response:data,
            message:"User Registered Successfully..Please Login"
        });
    }catch(err){
        res.send()
    }
})


router.post('/login', async (req, res, next) =>{
	console.log(req.body);
    try{
        User.findOne({email:req.body.email},function(err,data){
            if(data){
                if(data.password==req.body.password){
                    //console.log("Done Login");
                    // req.session.userId = data.u_id;
                    res.status(200).json({
                        statuscode:"200",
                        response:data,
                        message:"User Logged In Successfully"
                    });
                }else{
                    res.status(401).json({
                        statuscode:"500",
                        response:"",
                        message:"User Password Mismatch"
                    });
                }
            }else{
                res.status(401).json({
                    statuscode:"500",
                    response:"",
                    message:"User Not Exist"
                });
            }
        });
    }catch(err){
        res.send()
    }

});



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