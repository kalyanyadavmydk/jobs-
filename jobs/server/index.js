const express=require('express')
const cors=require('cors')
const bodyparser=require('body-parser')
const app=express()

app.use(cors())
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

const job=require('./models/jobs_create-schema');
const db=require('./config/mongoose');



app.listen(3000,()=>{
    
    console.log("server stared successfully" )
})


app.post('/create/jobs',(req,res,next)=>{
   
    job.create({
        company:req.body.company,
        website:req.body.website,
        role:req.body.role,
        experience:req.body.experience,
        location:req.body.location,
        batch:req.body.batch,
        degree:req.body.degree,
        link:req.body.applylink,
        deadline:req.body.deadline
    },function(err,docs){
        if(err){
            res.send(err)
        }
        res.send({status:"ok"})
    })
})

app.get('/get/jobs',(req,res,next)=>{
    job.find({deadline:{$gte:new Date()}},function(err,docs){
        if(err){
            res.send(err)
        }
       
        res.send(docs)
    })
})
app.delete('/delete/job',(req,res)=>{
    job.remove({_id:req.query.id}).exec(function(err){
        if(err){
            res.send(err)
        }
        res.send({status:"deleted"})
    })
})
app.get('/sort/job',(req,res)=>{
    job.find({experience:req.query.experience,deadline:{$gte:new Date()}},function(err,docs){
        if(err){
            res.send(err)
        }
        res.send(docs)
    })
    
})