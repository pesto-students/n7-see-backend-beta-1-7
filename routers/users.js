const express = require('express');
const router = express.Router();
const User=require('../model/user');
const Category=require('../model/category');
var moment = require('moment');

//getallusers
router.get('/',async (req,res)=>{
    try{
        const users = await User.find()
        res.json(users);
    }catch(err){
        res.send()
    }
    // res.send('Get Requests');
})

router.get('/getcat',async (req,res)=>{
    try{
        const users = await Category.find()
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


//register user
function getU_id(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
      )
  }

router.post('/',async(req,res)=>{

    try{
        const user=new User({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:req.body.password,
            mobno:req.body.mobno,
            user_id:getU_id(100000,1000000),
            createddate:moment(new Date()).format('DD/MM/YYYY')
        });
        console.log(user)
        const data=await user.save() 
        console.log(data)
        res.status(200).json({
            statuscode:"200",
            response:data,
            message:"User Registered Successfully..Please Login"
        });
    }catch(err){
        res.send()
    }
})

//login user
router.post('/login', async (req, res, next) =>{
	console.log(req.body.email);
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



router.post('/updateuser',async (req,res)=>{
    var u_id=req.body.u_id;
    User.findOne(function(err,data){
        var myquery = {_id:u_id};
        console.log(data);
        var newvalues = {$set:{
            firstName:req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            // password:"pp",
            role:"user",
            mobno:req.body.mobno,
            address:req.body.address,
            city:req.body.city,
            gender:req.body.gender,
        }};
            User.updateOne(myquery,newvalues,function(err,data){
        if (err) 
            throw err;
        else 
            return res.send({"Success":"true"}); 
        });
    });

    // try{
    //     const user = await User.findById(req.params.id)
    //     user.sub=req.body.sub
    //     const data=await user.save()
    //     res.json(data);
    // }catch(err){
    //     res.send()
    // }
})




router.patch('/:id',async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        user.sub=req.body.sub
        const data=await user.save()
        res.json(data);
    }catch(err){
        res.send()
    }
})


//getmyprofile
router.get('/getmyprofile/:_id',async (req,res)=>{
    try{
        const myprofile = await User.find({"_id":req.params._id})
        res.json(myprofile);
    }catch(err){
        res.send()
    }
    // res.send('Get Requests');
})

//getcontactinfo
router.get('/getcontactinfo/:_id',async (req,res)=>{
    try{
        const myprofileinfo = await User.find({"_id":req.params._id})
        console.log(myprofileinfo)
        var contactinfo={
            firstName:myprofileinfo[0].firstName,
            lastName:myprofileinfo[0].lastName,
            email:myprofileinfo[0].email,
            mobno:myprofileinfo[0].mobno,
            address:myprofileinfo[0].address,
        }
        res.status(200).json({
            statuscode:"200",
            response:contactinfo,
            message:"Contact Info found"
        });
    }catch(err){
        res.send()
    }
    // res.send('Get Requests');
})

//editmyprofile
router.get('/',async (req,res)=>{
    try{
        const users = await User.find()
        res.json(users);
    }catch(err){
        res.send()
    }
    // res.send('Get Requests');
})


module.exports=router