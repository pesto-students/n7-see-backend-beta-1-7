const express = require('express');
const router = express.Router();
const User=require('../model/user');
const Request=require('../model/request');
const Category=require('../model/category');
const City=require('../model/city');
const Complaint=require('../model/complaint');
var moment = require('moment');
//getallusers
router.get('/getadmindashboard',async (req,res)=>{
    try{
        const totalUser=await User.find().count();
        const totalRequest=await Request.find().count();
        const requestPending=await Request.find({ status: "Pending" }).count();
        const requestApproved=await Request.find({ status: "Approved" }).count();
        const latestRequest=await Request.find().limit(6);
        const latestCategory=await Category.find().limit(5);
        const topCategory=await Request.aggregate([{$group:{_id: "$category", count:{$count:{}}}},{$sort:({"count":-1})}])
        const requestCount=await Request.aggregate([{$group:{_id: "$createddate", count:{$count:{}}}}]).sort({_id:-1})
        const userCount=await User.aggregate([{$group:{_id: "$createddate", count:{$count:{}}}}]).sort({_id:-1})
        console.log(requestCount);

        // const usersCount=User.aggregate([
        //     {
        //       $group: {
        //         _id: {
        //           month: { $month: "$createddate" },
        //           day: { $dayOfMonth: "$createddate" },
        //           year: { $year: "$createddate" }
        //         },
        //         count: { $count:{}}
        //       }
        //     }
        //   ]);

          var d = new Date();
            d.setDate(d.getDate()-7);

            // const usersCount=User.aggregate([
            //     {
            //       $match:{
            //           createddate: {$gte: d,$lte: new Date()}
            //         }
            //    },
            //    {
            //        $group:{_id:null, user:{$count:{}}}
            //    }
            //  ]).toArray(function (err, result) {
            //     if (err) {
            //         console.log(err);
            //         return;
            //     }
            //     else
            //     {
            //         console.log(result);
            //         return result
            //         // res.json(result);
            //     }
            // });



            // const requestCount=Request.aggregate([
            //     {
            //       $match:{
            //           createddate: {$gte: d,$lte: d.setDate(d.getDate())}
            //         }
            //    },
            //    {
            //        $group:{_id:null, category:{$count:{}}}
            //    }
            //  ]).toArray(function (err, result) {
            //     if (err) {
            //         console.log(err);
            //         return;
            //     }
            //     else
            //     {
            //         console.log(result);
            //         return result
            //         // res.json(result);
            //     }
            // });


            // const requestCount=Request.aggregate( [
            //     { 
            //         $match: { 
            //             createddate: { $gte: d }
            //         }
            //     },
            //     { 
            //         $group: {
            //             _id: { "month": { $substrCP: [ "$createddate", 0, 7 ] } }, 
            //             count: { $sum: 1 }
            //         } 
            //     }
            // ]).toArray(function (err, result) {
            //         if (err) {
            //             console.log(err);
            //             return;
            //         }
            //         else
            //         {
            //             console.log(result);
            //             return result
            //             // res.json(result);
            //         }
            //     });

            //     console.log("SDFsdf",requestCount)
        var data = JSON.stringify({ 
            totalUser: totalUser, 
            userCount:userCount,
            requestCount:requestCount,
            totalRequest: totalRequest, 
            requestPending: requestPending, 
            requestApproved: requestApproved,
            latestRequest:latestRequest,
            latestCategory:latestCategory,
            topCategory:topCategory,
            
          });

          res.status(200).json({
            statuscode:"200",
            response:JSON.parse(data),
            message:"Request Successfully.."
        });
    }catch(err){
        res.send()
    }
    // res.send('Get Requests');
})


//getallusers
router.post('/getallusers',async (req,res)=>{
    var page=req.body.page;
    var limit=req.body.limit;
    try{
        const users = await User.find().skip(limit*(page-1)).limit(limit).sort({_id:-1})
        const count = await User.find().count();
        res.status(200).json({
            statuscode:"200",
            response:{
                users:users,
                count:count
            },
            message:"Request Successfully.."
        });
    }catch(err){
        res.send()
    }
    // res.send('Get Requests');
})





//getallrequest
router.post('/getallrequest',async (req,res)=>{
    var page=req.body.page;
    var limit=req.body.limit;
    try{
        const request = await Request.find().skip(limit*(page-1)).limit(limit).sort({_id:-1})
        const count = await Request.find().count();
        res.status(200).json({
            statuscode:"200",
            response:{
                request:request,
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

//getallcategory
router.post('/getallcategory',async (req,res)=>{
    var page=req.body.page;
    var limit=req.body.limit;
    try{
        const category = await Category.find().skip(limit*(page-1)).limit(limit).sort({_id:-1})
        const count = await Category.find().count();
        res.status(200).json({
            statuscode:"200",
            response:{
                category:category,
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
    // res.send('Get Requests');
})

//getallcategory
router.get('/getcategory',async (req,res)=>{
    try{
        const category = await Category.find();
        res.status(200).json({
            statuscode:"200",
            response:category,
            message:"Request Successfully.."
        });
    }catch(err){
        res.status(401).json({
            statuscode:"500",
            response:"",
            message:"Request Failed"
        });
    }
    // res.send('Get Requests');
})

//getallcategory
router.get('/getcity',async (req,res)=>{
    try{
        const city = await City.find();
        res.status(200).json({
            statuscode:"200",
            response:city,
            message:"Request Successfully.."
        });
    }catch(err){
        res.status(401).json({
            statuscode:"500",
            response:"",
            message:"Request Failed"
        });
    }
    // res.send('Get Requests');
})
//getallcity
router.post('/getallcity',async (req,res)=>{
    var page=req.body.page;
    var limit=req.body.limit;
    try{
        const city = await City.find().skip(limit*(page-1)).limit(limit).sort({_id:-1})
        const count = await City.find().count();
        res.status(200).json({
            statuscode:"200",
            response:{
                city:city,
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


//getallcomplaints
router.post('/getallcomplaints',async (req,res)=>{
    var page=req.body.page;
    var limit=req.body.limit;
    try{
        const complaints = await Complaint.find().skip(limit*(page-1)).limit(limit).sort({_id:-1})
        const count = await Complaint.find().count();
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

//deleteMyRequest
router.get('/deleteCategory/:_id',async (req,res)=>{
    // console.log(req.params.email);
    try{
        const category = await Category.deleteOne({_id:req.params._id})
        console.log(category);
        res.status(200).json({
            statuscode:"200",
            response:category,
            message:"Data Deleted Successfully"
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
router.get('/deleteCity/:_id',async (req,res)=>{
    console.log(req.params._id);
    try{
        const city = await City.deleteOne({_id:req.params._id})
        console.log(city);
        res.status(200).json({
            statuscode:"200",
            response:city,
            message:"Data Deleted Successfully"
        });
    }catch(err){
        res.status(401).json({
            statuscode:"500",
            response:"",
            message:"Request Failed"
        });
    }
})



router.post('/manageRequest',async (req,res)=>{
    var r_id=req.body.request_id;
    Request.findOne(function(err,data){
        var myquery = {_id:r_id};
        var newvalues = {$set:{
            status:req.body.status,
        }};
        
        Request.updateOne(myquery,newvalues,function(err,data){
        if (err) 
            throw err;
        else 
            return res.send({"Success":"true"}); 
        });
    });

})

router.post('/manageUser',async (req,res)=>{
    var u_id=req.body.user_id;
    User.findOne(function(err,data){
        var myquery = {_id:u_id};
        var newvalues = {$set:{
            status:req.body.status,
        }};
        User.updateOne(myquery,newvalues,function(err,data){
        if (err) 
            throw err;
        else 
            return res.send({"Success":"true"}); 
        });
    });

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
            mobno:"99999",
            address:"sdfsfsdfsdfsdfd"
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

router.get('/admin',async (req,res)=>{
    try{
        const users = await User.find()
        res.send("listening to 4000 admin");
    }catch(err){
        res.send()
    }
    // res.send('Get Requests');
})

///////////master collection

router.post('/addcategory',async(req,res)=>{

    try{
        const category=new Category({
            category:req.body.category,
        });
        console.log(category)
        const data=await category.save() 
        res.status(200).json({
            statuscode:"200",
            response:data,
            message:"Category Registered Successfully.."
        });
    }catch(err){
        res.send()
    }
})


router.post('/addcity',async(req,res)=>{

    try{
        const city=new City({
            city:req.body.city,
            latitude:req.body.latitude,
            longitude:req.body.longitude,
        });
        const data=await city.save() 
        res.status(200).json({
            statuscode:"200",
            response:data,
            message:"City Registered Successfully.."
        });
    }catch(err){
        res.send()
    }
})

router.post('/reply',async (req,res)=>{
    var c_id=req.body.c_id;
    Complaint.findOne(function(err,data){
        var myquery = {_id:c_id};
        var newvalues = {$set:{
            reply:req.body.reply,
            replydate: moment(new Date()).format('DD/MM/YYYY')
        }};
        Complaint.updateOne(myquery,newvalues,function(err,data){
        if (err) 
            throw err;
        else 
            return res.send({"Success":"true"}); 
        });
    });
})

module.exports=router