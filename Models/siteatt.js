

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Siteatten = new Schema({
   
    username: {
        type: String,
        
    },
    
    userid: {
        type: String
    }
    ,
    empno: {
        type: String
    }
    ,
    projectid:{
        type:String,
    },
    chkouttime:{
        type:String
    }
    ,
    workinghours:{
        type:String
    }
    ,
    
    wages:{
        
        type:String,
    },
    date:{
        
        type:String,
    },
    time:{
        
        type:String,
    },

    
    task:{
        
        type:String,
    },
    perdiem:{
        
        type:String,
    },
    food:{
        
        type:String,
    },
    onperdiem:{
        
        type:String,
    },
    
    projectname:{
        
        type:String,
    },
    workingtime:{
        type:Number
    }
    ,
    
    late:{
        type:String
    }
    ,
    
    status: {
        type: String
    },

},{
    timestamps:true
});






const Siteatt = mongoose.model('Siteatten', Siteatten);
module.exports =Siteatt
  
