// Importing important Nots
const express = require('express');
const app = express();
const Notiroute = express.Router();
let Not = require('../Models/Not');
var nodemailer = require('nodemailer');
const date = require('date-and-time');



Notiroute.route('/update').post(function(req, res) {
    Not.findByIdAndUpdate(
        { _id:req.body._id}, 

        {
            chkouttime:req.body.time,



        },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Not':success});
                }
                
             }
         }
    
      
    )
    

    
});

Notiroute.route('/add').post(function(req, res) {

    let Nots = new Not(req.body);
    Nots.save()
        .then(Not => {
            res.status(200).json({'Not': 'Not added successfully'});
            
        })
        .catch(err => {
          console.log("erer")
        });
});


Notiroute.route('/getall').get(function(req, res) {

    Not.find(
        { }).sort({createdAt: -1}).exec(

       
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Not':success});
                }
                
             }
         }
    
      
    )
});




Notiroute.route('/find').post(function(req, res) {
    Not.find(
        { idp:req.body.id}, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Not':success});
                }
                
             }
         }
    
      
    )
    

    
});

Notiroute.route('/findbydateandname').post(function(req, res) {
    Not.find(
        { date:req.body.date,
        userid:req.body.id
        }, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Not':success});
                }
                
             }
         }
    
      
    )
    

    
});

Notiroute.route('/findbydate').post(function(req, res) {
    Not.find(
        { date:req.body.date,
        }, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Not':success});
                }
                
             }
         }
    
      
    )
    

    
});


Notiroute.route('/findbydateandproject').post(function(req, res) {
    console.log(req.body.date)
    Not.find(
        { date:req.body.date,
        projectid:req.body.id
        }, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Not':success});
                }
                
             }
         }
    
      
    )
    

    
});

Notiroute.route('/findbyname').post(function(req, res) {
    Not.find(
        { 
        userid:req.body.id
        }, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Not':success});
                }
                
             }
         }
    
      
    )
    

    
});

Notiroute.route('/finduserdata').post(function(req, res) {
    Not.find(
        { userid:req.body.userid}).sort({createdAt: -1}).exec(
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Not':success});
                }
                
             }
         }
    
      
    )
    

    
});


Notiroute.route('/findcatt').post(function(req, res) {
    Not.find(
        { date:req.body.date},
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Not':success});
                }
                
             }
         }
    
      
    )
    

    
});


Notiroute.route('/time').get(function(req, res) {
    var datec=new Date()
    var ustime=datec.toLocaleString("en-US", {timeZone: "America/New_York"})
    res.status(200).json({'Date':ustime});
    

    
});

Notiroute.route('/findcattuser').post(function(req, res) {
    Not.find(
        { date:req.body.date,
        userid:req.body.userid,
        },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Not':success});
                }
                
             }
         }
    
      
    )
    

    
});











module.exports = Notiroute;
