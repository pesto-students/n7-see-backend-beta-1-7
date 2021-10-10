const express = require('express');
const router = express.Router();
const Complaint=require('../model/complaint');
var moment = require('moment');

//getallcomplaint
router.get('/',async (req,res)=>{
    try{
        const request = await Complaint.find().sort({_id:-1})
        var data = JSON.stringify({ 
            banner: request, 
            latestlisting: request, 
            highlightedlisting: request, 
            featuredlisting: request
          });
        //console.log(data);
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

//deletemycomplaint
router.get('/deletemycomplaint/:_id',async (req,res)=>{
    try{
        const complaint = await Complaint.deleteOne({"_id":req.params._id})
        res.status(200).json({
            statuscode:"200",
            response:complaint,
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

//getmycomplaint
router.get('/getmycomplaint/:email',async (req,res)=>{
    try{
        const request = await Complaint.find({from:req.params.email})
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

function getToken_id(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
      )
  }
//register new complaint
router.post('/',async(req,res)=>{
    const complaint=new Complaint({
        from:req.body.from,
        name:req.body.name,
        to:"admin",
        complaint_id:getToken_id(100000,1000000),
        subject:req.body.subject,
        content:req.body.content, 
        createddate:moment(new Date()).format('DD/MM/YYYY')
    })
    //console.log(complaint)
    try{
        const data=await complaint.save() 
        //console.log(data)
        res.status(200).json({
            statuscode:"200",
            response:{},
            message:"Complaint Registered Successfully.."
        });
    }catch(err){
        res.status(401).json({
            statuscode:"500",
            response:"",
            message:"Complaint Registeration Failed"
        });
    }
})


//getallmycomplaints
router.post('/getallmycomplaints',async (req,res)=>{
    var page=req.body.page;
    var limit=req.body.limit;
    var u_id=req.body.u_id;
    try{
        const complaints = await Complaint.find({from:u_id}).skip(limit*(page-1)).limit(limit)
        const count = await Complaint.find({from:u_id}).count();
        res.status(200).json({
            statuscode:"200",
            response:{
                complaints:complaints,
                count:count
            },
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


////////////////////////////////
//getmyinterest



module.exports=router