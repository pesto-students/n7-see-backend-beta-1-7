const express = require('express');
const router = express.Router();
const Request=require('../model/request');
const Interest=require('../model/interest');
const User=require('../model/user');
var multer = require('multer');
var moment = require('moment');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //console.log("sdfsd",file)
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
     
    cb(null, Date.now() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file')
//getallrequest
router.get('/',async (req,res)=>{
    try{
        const request = await Request.find({"status":"Approved"}).sort({_id:-1})
        const latestlisting = await Request.find({"status":"Approved"}).sort({_id:-1})
        var data = JSON.stringify({ 
            banner: request, 
            latestlisting: latestlisting, 
            highlightedlisting: request, 
            featuredlisting: request
          });
        // console.log(data);
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
        const request = await Request.find({"status":"Approved"}).sort({_id:-1})
        const latestlisting = await Request.find({"status":"Approved"}).sort({_id:-1})
        var data = JSON.stringify({ 
            banner: request, 
            latestlisting: latestlisting, 
            highlightedlisting: request, 
            featuredlisting: request
          });
        // console.log(data);
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

router.post('/upload',function(req, res) {
    //  console.log(req)
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               //console.log("fwee");
               return res.status(500).json(err)
           } else if (err) {
                //   console.log("fweexcvxxcvx");
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

});

//get home page content
router.get('/getRequestByCategory/:category',async (req,res)=>{
    // console.log(req.params.category);
    var myReq=req.params.category!=="Browse All"?req.params.category:""
    var myReqType=myReq!==""?{$and:[{category:myReq},{"status":"Approved"}]}:{"status":"Approved"}
    try{
        const request = await Request.find(myReqType).sort({_id:-1})
        // console.log(data);
        res.status(200).json({
            statuscode:"200",
            response:request,
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
        //console.log(request);
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
        const request = await Request.find({"u_id":req.params.u_id}).sort({_id:-1})
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

router.post('/getmyrequest',async (req,res)=>{
    var page=req.body.page;
    var limit=req.body.limit;
    var u_id=req.body.u_id;
    try{
        const request = await Request.find({"u_id":u_id}).skip(limit*(page-1)).limit(limit).sort({_id:-1})
        const count = await Request.find({"u_id":u_id}).count();
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

//getrequestbyid
router.get('/getrequestbyid/:_id',async (req,res)=>{
   // console.log(req.params._id)
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
    // console.log(moment(new Date()).format('DD/MM/YYYY'))
    const request=new Request({
        category:req.body.category,
        productname:req.body.productname,
        description:req.body.description,
        cost:req.body.cost,
        u_id:req.body.u_id,
        req_id:getReq_id(100000,1000000),
        username:req.body.username,
        city:req.body.city,
        image:req.body.image,
        createddate:moment(new Date()).format('DD/MM/YYYY')
    })
    //console.log(request)
    try{
        const data=await request.save() 
        // console.log(data)
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

//getmyrequest
router.get('/getmyinterest/:u_id',async (req,res)=>{
    try{
        const request = await Interest.find({"u_id":req.params.u_id})
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



router.post('/getmyinterest',async (req,res)=>{
    var page=req.body.page;
    var limit=req.body.limit;
    var u_id=req.body.u_id;
    try{
        const interest = await Interest.find({"u_id":u_id}).skip(limit*(page-1)).limit(limit).sort({_id:-1})
        const count = await Interest.find({"u_id":u_id}).count();
        res.status(200).json({
            statuscode:"200",
            response:{
                interest:interest,
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



//setmyinterest
router.post('/expressinterest',async (req,res)=>{
    // console.log("r_id")
    // console.log("req.body.r_id")
    // // console.log(u_id)
    // console.log("r_id")
    var r_id=req.body.r_id;
    var u_id=req.body.u_id;
    try{
        // db.requests.update({_id:"614f695584fa43449cf7cb45"},{$push:{interest:"614f61765dca9747ccaa7b31"}})
        // const user = await User.find({_id:req.body.u_id})
        // /const req = await Request.updateOne({_id:ObjectId("6150905715199d05e4e95cc2")},{$push:{"interest":"614f61765dca9747ccaa7b31"}})
        // const user = await User.find({_id:u_id})
        
        await Request.find({_id:r_id}).then(function(re){
            // console.log(re);
            const interest=new Interest({
                category:re[0].category,
                productname:re[0].productname,
                description:re[0].description,
                cost:re[0].cost,
                u_id:u_id,
                r_id:r_id,
                req_id:re[0].req_id,
                username:re[0].username,
                status:re[0].status,
                image:re[0].image,
                createddate:moment(new Date()).format('DD/MM/YYYY')
            })
            try{
                const data= interest.save() 
                 User.find({_id:u_id}).then(function(user) {
 
                    // console.info('The promise was fulfilled with items!', user[0]);
                     Request.updateOne({_id:r_id},{$push:{interest:user[0]}}).then(function(request) {
                         
                           
                            res.status(200).json({
                                    statuscode:"200",
                                    response:request,
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
                // console.log("data",data)

            }catch(err){
                console.log(err)
            }
            
        })

        // await User.find({_id:u_id}).then(function(user) {
 
        //     // console.info('The promise was fulfilled with items!', user[0]);
        //      Request.updateOne({_id:r_id},{$push:{interest:user[0]}}).then(function(request) {
                 
                   
        //             res.status(200).json({
        //                     statuscode:"200",
        //                     response:request,
        //                     message:"Interest Accepted Successfully"
        //                 });
                
        //       }, function(err) {
        //             res.status(401).json({
        //                 statuscode:"401",
        //                 response:"",
        //                 message:"Interest Not Accepted"
        //             });
        //       });

        //   }, function(err) {

        //         res.status(401).json({
        //             statuscode:"401",
        //             response:"",
        //             message:"Your interest is not accepted"
        //         });
        //   });



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


router.post('/search', async (req, res, next)=> {
    try{
        var search=req.body.search;
        var page=req.body.page;
        var limit=req.body.limit;
        // const result = await Request.find({category: { $regex: '.*' + search + '.*' } }).skip(limit*(page-1)).limit(limit).sort({_id:-1})
        const count = await Request.find({category: { $regex: '.*' + search + '.*' } }).count();

        const result = await Request.aggregate([
            { "$match": { category: { $regex: '.*' + search + '.*' } } },
            {        
                        $lookup:
                        {
                            from:"cities",
                            localField:"city",
                            foreignField:"city",
                            as:"citys"
                        }
                    
              },
              { $sort : {_id:-1} }
            ]).skip(limit*(page-1)).limit(limit)
        // var productname="sdf";
    
        // const request = await Request.find({category: { $regex: '.*' + category + '.*' } });

        // const request = await Request.find({
        //     $and: [
        //       { category: { $regex: '.*' + category + '.*' } },
        //       { productname: { $regex: '.*' + productname + '.*' } },
        //     ],
        //   })
        res.status(200).json({
            statuscode:"200",
            response:{
                result:result,
                count:count
            },
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


router.post('/history', async (req, res, next)=> {
    try{
        // console.log(req.body.email);
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


