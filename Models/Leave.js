

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Leave = new Schema({
   
   
    leave: {
        type: String,
        
    }
    ,
    username:{
        type:String,
    },
    date:{
        type:String
    }
    ,
    status: {
        type: String
    },
    sender:{
        type:String
    }
    
});






const Leavemodel = mongoose.model('Leave', Leave);
module.exports =Leavemodel
  
