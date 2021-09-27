const express = require('express');
const router = express.Router();
const Request=require('../model/request');
const User=require('../model/user');
var moment = require('moment');

//getallrequest
router.get('/',async (req,res)=>{
    try{
        const request = await Request.find().sort({_id:-1})
        const latestlisting = await Request.find({"status":"Approved"}).sort({_id:-1})
        var data = JSON.stringify({ 
            banner: request, 
            latestlisting: latestlisting, 
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

//get home page content
router.get('/getHomeRequest',async (req,res)=>{
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

//deleteMyRequest
router.get('/deleteMyRequest/:_id',async (req,res)=>{
    // console.log(req.params.email);
    try{
        const request = await Request.deleteOne({_id:req.params._id})
        console.log(request);
        res.status(200).json({
            statuscode:"200",
            response:request,
            message:"Deleted Successfully"
        });
    }catch(err){
        res.status(401).json({
            statuscode:"500",
            response:"",
            message:"Request Failed"
        });
    }
})

//getmyrequest
router.get('/getmyrequest/:u_id',async (req,res)=>{
    try{
        const request = await Request.find({"u_id":req.params.u_id})
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

//getrequestbyid
router.get('/getrequestbyid/:_id',async (req,res)=>{
    console.log(req.params._id)
    try{
        const request = await Request.find({_id:req.params._id})
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

  //add my request
router.post('/',async(req,res)=>{
    console.log(moment(new Date()).format('DD/MM/YYYY'))
    const request=new Request({
        category:req.body.category,
        productname:req.body.productname,
        description:req.body.description,
        cost:req.body.cost,
        u_id:req.body.u_id,
        req_id:getReq_id(100000,1000000),
        username:req.body.username,
        createddate:moment(new Date()).format('DD/MM/YYYY')
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



////////////////////////////////
//getmyinterest
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

//setmyinterest
router.post('/expressinterest',async (req,res)=>{
    // console.log("r_id")
    console.log(req.body.r_id)
    // // console.log(u_id)
    // console.log("r_id")
    var r_id=req.body.r_id;
    var u_id=req.body.u_id;
    console.log(typeof r_id);
    try{
        // db.requests.update({_id:"614f695584fa43449cf7cb45"},{$push:{interest:"614f61765dca9747ccaa7b31"}})
        // const user = await User.find({_id:req.body.u_id})
        // /const req = await Request.updateOne({_id:ObjectId("6150905715199d05e4e95cc2")},{$push:{"interest":"614f61765dca9747ccaa7b31"}})
        // const user = await User.find({_id:u_id})

        await User.find({_id:u_id}).then(function(user) {

            console.info('The promise was fulfilled with items!', user[0]);
             Request.updateOne({_id:r_id},{$push:{interest:user[0]}}).then(function(request) {
                    res.status(200).json({
                            statuscode:"200",
                            response:"",
                            message:"Interest Accepted Successfully"
                        });
                
              }, function(err) {
                    res.status(401).json({
                        statuscode:"401",
                        response:"",
                        message:"Interest Not Accepted"
                    });
              });

          }, function(err) {

                res.status(401).json({
                    statuscode:"401",
                    response:"",
                    message:"Your interest is not accepted"
                });
          });

        // const req = await Request.updateOne({_id:r_id},{$push:{interest:u_id}})
        // res.status(401).json({
        //     statuscode:"200",
        //     response:"",
        //     message:"Request Successfull"
        // });
        // return res.send({"Success":"true"}); 


        
        // const req = await Request.findByIdAndUpdate(r_id,
        //     {$addToSet: {interest: u_id}},
        //     {safe: true, upsert: true},
        //     function(err, doc) {
        //         if(err){
        //             return res.send({"Error":"failed"}); 
        //         }else{
        //             return res.send({"Success":"true"}); 
        //         }
        //     }
        // );
        // const req = await Request.findOne({"_id":req.body.r_id}).exec(function(err,res) {
        //     console.log("dsds",res)
        //     res.interest.push( req.body.u_id );
        //     res.save(function(err){
        //       // something here
        //     });
        //  });
         
        // const req = await Request.find({_id:req.body.r_id})
        // console.log(req.body.r_id)
        // const request = await Request.findOne({"_id":req.body.r_id})
        // console.log(request)
        
        // console.log(req);
        // Request.findOne(function(err,data){
        //     var myquery = {_id:r_id};
        //     var newvalues = {$set:{
        //         status:data.status,
        //         category: data.category,
        //         productname: data,productname,
        //         description: data.description,
        //         cost:data.cost,
        //         u_id:data.u_id,
        //         req_id:data.req_id,
        //         username:data.username,
        //         createddate:data.createddate
        //         interest:
        //     }};
        //     Request.updateOne(myquery,newvalues,function(err,data){
        //     if (err) 
        //         throw err;
        //     else 
        //         return res.send({"Success":"true"}); 
        //     });
        // });
        // console.log(req)
        // var data = JSON.stringify({ 
        //     banner: request, 
        //     latestlisting: request, 
        //     highlightedlisting: request, 
        //     featuredlisting: request
        //   });
        // Request.findOne(function(err,data){
        //     var myquery = {_id:r_id};
        //     var newvalues = {$set:{
                
        //     }};
        //     Request.updateOne(myquery,newvalues,function(err,data){
        //     if (err) 
        //         throw err;
        //     else 
        //         return res.send({"Success":"true"}); 
        //     });
        // });
        // console.log(data);
        // res.status(200).json({
        //     statuscode:"200",
        //     response:JSON.parse(data),
        //     message:"Request Successfully.."
        // });
    }catch(err){
        res.status(401).json({
            statuscode:"500",
            response:"",
            message:"Request Failed"
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