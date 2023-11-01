// Importing important Leaves
const express = require('express');
const app = express();
const Leaveroute = express.Router();
let Leave = require('../Models/Leave');
var nodemailer = require('nodemailer');



Leaveroute.route('/update').post(function(req, res) {
    Leave.findByIdAndUpdate(
        { _id:req.body._id}, 

        {
            Leavename:req.body.Leavename,
            fullname:req.body.fullname,



        },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Leave':success});
                }
                
             }
         }
    
      
    )
    

    
});

Leaveroute.route('/updatestatus').post(function(req, res) {
    Leave.findByIdAndUpdate(
        { _id:req.body.id},


        {
            status:req.body.status



        },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Leave':success});
                }
                
             }
         }
    
      
    )
    

    
});

Leaveroute.route('/add').post(function(req, res) {

    let Leaves = new Leave(req.body);
    Leaves.save()
        .then(Leave => {
            res.status(200).json({'Leave': 'Leave added successfully'});
        })
        .catch(err => {
          console.log("erer")
        });
});


Leaveroute.route('/getall').get(function(req, res) {

    Leave.find(
        { }, 

       
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Leave':success});
                }
                
             }
         }
    
      
    )
});


Leaveroute.route('/find').post(function(req, res) {
    Leave.find(
        { Leave_id:req.body.Leave_id}, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Leave':success});
                }
                
             }
         }
    
      
    )
    

    
});



Leaveroute.route('/finduserdata').post(function(req, res) {
    Leave.find(
        { sender:req.body.sender}, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Leave':success});
                }
                
             }
         }
    
      
    )
    

    
});











module.exports = Leaveroute;
