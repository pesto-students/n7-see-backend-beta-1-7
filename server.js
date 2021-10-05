const express = require('express');
const app=express();
app.use(express.json())
var cors = require('cors');
app.use(cors());
app.use(express.static('public'))

const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/see_db'
mongoose.connect(url, { useNewUrlParser: true })
const db = mongoose.connection
db.once('open', _ => {
    console.log('Database connected:', url)
  })

db.on('error', err => {
    console.error('connection error:', err)
  })

const alienRouter=require('./routers/aliens');
const userRouter=require('./routers/users');
const requestRouter=require('./routers/request');
const complaintRouter=require('./routers/complaints');
const adminRouter=require('./routers/admin');

app.use('/aliens',alienRouter);
app.use('/users',userRouter);
app.use('/request',requestRouter);
app.use('/complaint',complaintRouter);
app.use('/admin',adminRouter);


app.get('/',function(req,res){
    res.send("hyy555dfsd");
})

app.listen(4000,function(){
    console.log('listening');
})