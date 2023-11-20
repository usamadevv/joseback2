// Importing important Clients
const express = require('express');
const app = express();
const Clientroute = express.Router();
let Client = require('../Models/Cleint');
var nodemailer = require('nodemailer');



Clientroute.route('/update2').post(function(req, res) {
    console.log(req.body.weekno)
    Client.findOneAndUpdate(
        { _id:req.body._id,'invoicedata.weekno': req.body.weekno, // Specify the condition to match the element within the array
        'invoicedata.year': req.body.year}, 

        {
            
            $set:{
            
                "invoicedata.$.date":req.body.date,
                "invoicedata.$.no":req.body.no,
                "invoicedata.$.due":req.body.due,
                "invoicedata.$.total":req.body.total,
                "invoicedata.$.paid":req.body.paid,
                "invoicedata.$.balance":req.body.balance,
                "invoicedata.$.invoicedetails":req.body.data,  
                "invoicedata.$.status":req.body.status,  
                "invoicedata.$.pdapplied":req.body.perdiemapplied,  
                "invoicedata.$.weekno":req.body.weekno,
                "invoicedata.$.year":req.body.year,
                "invoicedata.$.filename":req.body.filename,
            
        } 
    

        },
       function (error, success) {
             if (error) {
                console.log(error)
             } else {
                if(!success){
console.log('Invoice added')
                    Client.findOneAndUpdate(
                        { _id:req.body._id}, 
                
                        {$push:{
                            invoicedata:{
                            
                                date:req.body.date,
                                no:req.body.no,
                                due:req.body.due,
                                total:req.body.total,
                                paid:req.body.paid,
                                balance:req.body.balance,
                                invoicedetails:req.body.data,  
                                status:req.body.status,  
                                pdapplied:req.body.perdiemapplied,  
                                reporttype:req.body.reporttype,  
                                weekno:req.body.weekno,
                                year:req.body.year,
                                filename:req.body.filename
                            }   
                        } 
                
                        },
                    
                       function (error2, success2) {
                             if (error2) {
                                res.send('error2')
                             } else {
                                if(!success2){
                
                                    res.send('invalid')
                                }
                                else{
                
                                    res.status(200).json({'Client':success2});
                                }
                                
                             }
                         }
                    
                      
                    )







                    
                }
                else{
                    console.log('Invoice updated')
                    res.status(200).json({'Client':'updated'});
                }
                
             }
         }
    
      
    )
  
    

    
});

Clientroute.route('/update').post(function(req, res) {
    console.log(req.body)
    Client.findOneAndUpdate(
        { _id:req.body._id}, 

        {$push:{
            invoicedata:{
            
                date:req.body.date,
                no:req.body.no,
                due:req.body.due,
                total:req.body.total,
                paid:req.body.paid,
                balance:req.body.balance,
                invoicedetails:req.body.data,  
                status:req.body.status,  
                pdapplied:req.body.perdiemapplied,  
                reporttype:req.body.reporttype,  
                weekno:req.body.weekno,
                year:req.body.year,
                filename:req.body.filename,

                by:req.body.by,
                created:req.body.created,

            }   
        } 

        },
    
       function (error2, success2) {
             if (error2) {
                res.send('error2')
             } else {
                if(!success2){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Client':success2});
                }
                
             }
         }
    
      
    )

  
    

    
});

Clientroute.route('/updatedata').post(function(req, res) {
    console.log(req.body)
    Client.findOneAndUpdate(
        { _id:req.body._id}, 

       
       {
        
        username:req.body.username,
        address:req.body.address,
        number:req.body.number,
        terms:req.body.terms,
        markup:req.body.markup,
        status:req.body.status,

        weekend:req.body.weekend,        
       }
        ,
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Client':success});
                }
                
             }
         }
    
      
    )
    

    
});


Clientroute.route('/updatefunds').post(function(req, res) {
    Client.findOneAndUpdate(
        { _id:req.body.id,'invoicedata._id':req.body.subid}, 

        

            { $set: { 
                
                "invoicedata.$.paid": req.body.paid,
                "invoicedata.$.balance": req.body.balance,
                "invoicedata.$.total": req.body.total,
                "invoicedata.$.status": req.body.status,
            
            } }

            
        ,
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Client':success});
                }
                
             }
         }
    
      
    )
    

    
});

Clientroute.route('/add').post(function(req, res) {

    let Clients = new Client(req.body);
    Clients.save()
        .then(Client => {
            res.status(200).json({'Client': 'Client added successfully'});
        })
        .catch(err => {
          console.log("erer")
        });
});


Clientroute.route('/getall').get(function(req, res) {

    Client.find(
        { }, 

       
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Client':success});
                }
                
             }
         }
    
      
    )
});
Clientroute.route('/inactive').get(function(req, res) {

    Client.find(
        { status:'Inactive'}, 

       
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Client':success});
                }
                
             }
         }
    
      
    )
});

Clientroute.route('/active').get(function(req, res) {

    Client.find(
        { status:'Active'}, 

       
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Client':success});
                }
                
             }
         }
    
      
    )
});


Clientroute.route('/find').post(function(req, res) {
    console.log(req.body)
    Client.find(
        { _id:req.body.Client_id}, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Client':success});
                }
                
             }
         }
    
      
    )
    

    
});

Clientroute.route('/findbyid').post(function(req, res) {
    Client.find(
        { _id:req.body.Client_id}, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Client':success});
                }
                
             }
         }
    
      
    )
    

    
});


Clientroute.route('/findbyname').post(function(req, res) {
    Client.find(
        { username:req.body.name}, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Client':success});
                }
                
             }
         }
    
      
    )
    

    
});

Clientroute.route('/findbyemail').post(function(req, res) {
    Client.find(
        { email:req.body.email}, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Client':success});
                }
                
             }
         }
    
      
    )
    

    
});

Clientroute.route('/delete').post(function(req, res) {
    console.log(req.body)
    var ids= req.body.ids
    Client.deleteMany(
        { _id:{ $in: ids }}, 
    
       function (error, success) {
             if (error) {
                res.send(error)
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Client':success});
                }
                
             }
         }
    
      
    )
    

    
});


Clientroute.route('/deletedata').post(function(req, res) {
    console.log(req.body)
    var ids= req.body.ids
    Client.deleteMany(
        { _id:{ $in: ids }}, 
    
       function (error, success) {
             if (error) {
                res.send(error)
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Client':success});
                }
                
             }
         }
    
      
    )
    

    
});











module.exports = Clientroute;
