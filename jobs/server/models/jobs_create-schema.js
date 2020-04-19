const mongoose=require('mongoose')
const eventschema=new mongoose.Schema({
    company:{
        type:String,
    },
    website:{
        type:String
    },
    role:{
        type:String
    },
    experience:{
        type:String
    },
    location:{
        type:String
     },
    batch:{
        type:Number
    },
    degree:[String],
     link:{
        type:String
     },
     deadline:{
         type:Date
     }
    
})
const jobs_data=mongoose.model('jobs_data',eventschema);
module.exports=jobs_data;