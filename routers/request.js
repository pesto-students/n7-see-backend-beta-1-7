const express = require('express');
const router = express.Router();
const Request=require('../model/request');

router.get('/',async (req,res)=>{
    try{
        const request = await Request.find().sort({_id:-1})
        var data = JSON.stringify({ 
            banner: request, 
            latestlisting: request, 
            highlightedlisting: request, 
            featuredlisting: request
          });
        console.log(data);
        res.status(200).json({
            statuscode:"200",
            response:JSON.parse(data),
            message:"Request Successfully.."
        });
    }catch(err){
        res.status(401).json({
            statuscode:"500",
            response:"",
            message:"Request Failed"
        });
    }
})

router.get('/:email',async (req,res)=>{
    try{
        const request = await Request.find({email:email})
        res.status(200).json({
            statuscode:"200",
            response:request,
            message:"Data Found"
        });
    }catch(err){
        res.status(401).json({
            statuscode:"500",
            response:"",
            message:"Request Failed"
        });
    }
})

function getReq_id(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
      )
  }

router.post('/',async(req,res)=>{
    
    var getMyReqId=getReq_id(1,100)
    console.log(getMyReqId);
    const request=new Request({
        req_id:1,
        category:req.body.category,
        productname:req.body.productname,
        description:req.body.description,
        cost:req.body.cost,
        email:req.body.email,
        username:req.body.username,
        createddate:new Date()
    })
    console.log(request)
    try{
        const data=await request.save() 
        console.log(data)
        res.status(200).json({
            statuscode:"200",
            response:{},
            message:"Request Submitted Successfully.."
        });
    }catch(err){
        res.status(401).json({
            statuscode:"500",
            response:"",
            message:"Request Submission Failed"
        });
    }
})


router.post('/history', async (req, res, next)=> {
    try{
        console.log(req.body.email);
        const request = await Request.find({email:req.body.email})
        res.status(200).json({
            statuscode:"200",
            response:request,
            message:"Data Found"
        });
    }catch(err){
        res.status(401).json({
            statuscode:"500",
            response:"",
            message:"Request Failed"
        });
    };
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