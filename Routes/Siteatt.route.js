// Importing important Siteatts
const express = require('express');
const app = express();
const Siteattroute = express.Router();
let Siteatt = require('../Models/siteatt');
var nodemailer = require('nodemailer');
const date = require('date-and-time');



Siteattroute.route('/update').post(function(req, res) {
    Siteatt.findByIdAndUpdate(
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

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteattroute.route('/updatetask').post(function(req, res) {
    Siteatt.findByIdAndUpdate(
        { _id:req.body._id}, 

        {
            task:req.body.task,



        },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteattroute.route('/updateptime').post(function(req, res) {
    Siteatt.findOneAndUpdate(
        { userid:req.body.user_id,
            date:req.body.date
            }, 
        {
            
            $inc:{
                workingtime:1}



        },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteattroute.route('/updateitime').post(function(req, res) {
    Siteatt.findOneAndUpdate(
        { userid:req.body.user_id,
        date:req.body.date
        }, 

        {
            
            $inc:{
                Idletime:1}



        },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});


Siteattroute.route('/updatetime').post(function(req, res) {

    Siteatt.findByIdAndUpdate(
        { _id:req.body._id}, 

        {
            chkouttime:req.body.time,
workinghours:req.body.wh


        },
    
       function (error, success) {
             if (error) {
                res.send(error)
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteattroute.route('/updatetimelat').post(function(req, res) {

    Siteatt.findByIdAndUpdate(
        { _id:req.body._id}, 

        {
            chkouttime:req.body.time,
workinghours:req.body.wh,
wages:req.body.wages


        },
    
       function (error, success) {
             if (error) {
                res.send(error)
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteattroute.route('/add').post(function(req, res) {

    let Siteatts = new Siteatt(req.body);
    Siteatts.save()
        .then(Siteatt => {
            res.status(200).json({'Siteatt': 'Siteatt added successfully'});
            
        })
        .catch(err => {
          console.log("erer")
        });
});


Siteattroute.route('/getall').get(function(req, res) {

    Siteatt.find(
        { }).sort({createdAt: -1}).exec(

       
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
});




Siteattroute.route('/find').post(function(req, res) {
    Siteatt.find(
        { Siteatt_id:req.body.Siteatt_id}, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteattroute.route('/findbydateandname').post(function(req, res) {
    Siteatt.find(
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

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteattroute.route('/findbydateandchk').post(function(req, res) {
    console.log(req)
    Siteatt.find(
        { date:req.body.date,
        userid:req.body.id,
        chkouttime:req.body.chkouttime
        }, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteattroute.route('/findbydate').post(function(req, res) {
    console.log(req)
    Siteatt.find(
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

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});


Siteattroute.route('/findbydateandproject').post(function(req, res) {
    console.log(req.body.date)
    Siteatt.find(
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

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteattroute.route('/findbyname').post(function(req, res) {
    Siteatt.find(
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

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteattroute.route('/findbynameandproject').post(function(req, res) {
    Siteatt.find(
        { 
        userid:req.body.id,
        projectid:req.body.pid,
        }, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteattroute.route('/finduserdata').post(function(req, res) {
    Siteatt.find(
        { userid:req.body.userid}).sort({createdAt: -1}).exec(
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});


Siteattroute.route('/findcatt').post(function(req, res) {
    Siteatt.find(
        { date:req.body.date},
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});


Siteattroute.route('/time').get(function(req, res) {
    var datec=new Date()
    var ustime=datec.toLocaleString("en-US", {timeZone: "America/New_York"})
    res.status(200).json({'Date':ustime});
    

    
});

Siteattroute.route('/findbyproject').post(function(req, res) {
    console.log(req.body.date)
    Siteatt.find(
        { 
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

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});
Siteattroute.route('/findcattuser').post(function(req, res) {
    Siteatt.find(
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

                    res.status(200).json({'Siteatt':success});
                }
                
             }
         }
    
      
    )
    

    
});











module.exports = Siteattroute;
