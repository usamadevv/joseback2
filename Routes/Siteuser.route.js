// Importing important Siteuserds
const express = require('express');
const stream = require('stream');
const app = express();
const Siteroute = express.Router();
const admin = require("firebase-admin");
const fileUpload = require('express-fileupload');
const serviceAccount = require('../serviceaccount.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://superstar-24f98.appspot.com"
});
var bucket = admin.storage().bucket();

let Siteuserd = require('../Models/Siteuser');
var nodemailer = require('nodemailer');

app.use(fileUpload())
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'saleemjadoon766@gmail.com',
        pass: 'zyhqnhmthrzgbeys'
    }
});


  Siteroute.route('/uploadfile').post(function(req, res) {
  
   
    console.log(req.body)
    const uploadPicture = function() {
        return new Promise((resolve, reject) => {
     
          let bufferStream = new stream.PassThrough();
          bufferStream.end(new Buffer.from(req.body.image.replace('data:image/jpeg;base64,',''), 'base64'));
      
          // Retrieve default storage bucket
        
          // Create a reference to the new image file
          const currentDate = new Date();
          let file = bucket.file(`img/${currentDate.getTime().toString()}.jpg`);
      
          bufferStream.pipe(file.createWriteStream({
            metadata: {
              contentType: 'image/jpeg'
            }
          }))

          
          .on('error', error => {
            reject(`news.provider#uploadPicture - Error while uploading picture ${JSON.stringify(error)}`);
          })
          .on('finish', (file) => {
            // The file upload is complete.
            console.log("news.provider#uploadPicture - Image successfully uploaded: ", JSON.stringify(file));
          });

          const config = {
            action: 'read',
            expires: '03-01-2500'
          };
          let downloadUrl = file.getSignedUrl(config, (error, url) => {
            if (error) {
              reject(error);
            }
            console.log('download url ', url);
            Siteuserd.findByIdAndUpdate(
                { _id:req.body._id}, 
        
                {
                    imgurl:url
        
                },
            
               function (error, success) {
                     if (error) {
                        console.log(error)
                        res.send('error')
                     } else {
                        if(!success){
        
                            res.send('invalid')
                        }
                        else{
        
                            res.status(200).json({'Siteuserd':url});
                        }
                        
                     }
                 }
            
              
            )
            resolve(url);
          

          });
        })
      };
uploadPicture()


    
});
Siteroute.route('/uploadcert').post(function(req, res) {
  
   
    console.log(req.body)
    const uploadPicture = function() {
        return new Promise((resolve, reject) => {
     
          let bufferStream = new stream.PassThrough();
          let bufferStream2 = new stream.PassThrough();
          bufferStream.end(new Buffer.from(req.body.front.replace('data:image/jpeg;base64,',''), 'base64'));
      bufferStream2.end(new Buffer.from(req.body.back.replace('data:image/jpeg;base64,',''), 'base64'));
      
          // Retrieve default storage bucket
        
          // Create a reference to the new image file
          const currentDate = new Date();
          let file = bucket.file(`img/${currentDate.getTime().toString()}.jpg`);
          let file2 = bucket.file(`img/${currentDate.getTime().toString()}56.jpg`);
      
          bufferStream.pipe(file.createWriteStream({
            metadata: {
              contentType: 'image/jpeg'
            }
          }))
       bufferStream2.pipe(file2.createWriteStream({
            metadata: {
              contentType: 'image/jpeg'
            }
          }))

          
          .on('error', error => {
            reject(`news.provider#uploadPicture - Error while uploading picture ${JSON.stringify(error)}`);
          })
          .on('finish', (file) => {
            // The file upload is complete.
            console.log("news.provider#uploadPicture - Image successfully uploaded: ", JSON.stringify(file));
          });

          const config = {
            action: 'read',
            expires: '03-01-2500'
          };
          let downloadUrl = file.getSignedUrl(config, (error, url) => {

          let downloadUrl2 = file2.getSignedUrl(config, (errorn, urlx) => {
            if (error) {
                reject(error);
              }
              console.log('download url ', url);
  
  
              Siteuserd.findByIdAndUpdate(
                  { _id:req.body._id}, 
                  {$push:{
                      ids:{
                      idname:'Certificate',
                      front:url,
                      back:urlx,
                      }   
                  } 
          
                  },
              
                 function (error, success) {
                       if (error) {
                          console.log(error)
                          res.send('error')
                       } else {
                          if(!success){
          
                              res.send('invalid')
                          }
                          else{
          
                              res.status(200).json({'Siteuserd':url});
                          }
                          
                       }
                   }
              
                
              )
          })
          
            resolve(url);
          

          });
        })
      };
uploadPicture()


    
});

Siteroute.route('/update').post(function(req, res) {
    console.log(req.body.cpr)
    Siteuserd.findByIdAndUpdate(
        { _id:req.body._id}, 

        {
            name:req.body.name,
            nc:req.body.nc,
            taxes:req.body.taxas,
            skill:req.body.skill,
            payrate:req.body.pr,
            cpr:req.body.cpr,
            otpayrate:req.body.otpr,
            jobn:req.body.jobn,
            phone:req.body.phone,
            address:req.body.address,
            itin:req.body.itin,
            status:req.body.status,
            client:req.body.client,
            idno:req.body.idno,
            superallow:req.body.superallow,
            supermode:req.body.supermode,
            supersite:req.body.supersite,
            email:req.body.email,
            password:req.body.password,

            clientid:req.body.clientid,

            langlat:req.body.langlat

        },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteuserd':success});
                }
                
             }
         }
    
      
    )
    

    
});


Siteroute.route('/notify').post(function(req, res) {
    console.log(req.body.cpr)
    Siteuserd.findByIdAndUpdate(
        { _id:req.body.id}, 

        {
            notification:'false',
          
          
        },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteuserd':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteroute.route('/pass').post(function(req, res) {
    Siteuserd.findOneAndUpdate(
        { email:req.body.email}, 

        {
           
            password:req.body.password

        },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteuserd':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteroute.route('/updatebulk').post(function(req, res) {
   const objectToUpdate= req.body.preparedata.map( eachObj => {
        return {
            updateOne: {
                filter: { name: eachObj.Employee },
                update: {  wages: eachObj.net }
            }
        }
    })
    Siteuserd.bulkWrite(objectToUpdate,
        { ordered: false },
        function (error, success) {
            if (error) {
               res.send('error')
            } else {
               if(!success){

                   res.send('invalid')
               }
               else{

                   res.status(200).json({'Siteuserd':success});
               }
               
            }
        }
        )
    
});

Siteroute.route('/updatefromuser').post(function(req, res) {
    Siteuserd.findByIdAndUpdate(
        { _id:req.body._id}, 

        {
            name:req.body.name,
            skill:req.body.skill,
            phone:req.body.phone,
            status:req.body.status,

        },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteuserd':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteroute.route('/profilechange').post(function(req, res) {
    Siteuserd.findByIdAndUpdate(
        { _id:req.body._id}, 

        {
            imgurl:req.body.imgurl

        },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteuserd':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteroute.route('/originalphoto').post(function(req, res) {
    Siteuserd.findByIdAndUpdate(
        { _id:req.body._id}, 

        {
            imgurl2:req.body.imgurl

        },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteuserd':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteroute.route('/updatestatus').post(function(req, res) {
    Siteuserd.findByIdAndUpdate(
        { _id:req.body._id}, 

        { login:req.body.login,
        },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteuserd':success});
                }
                
             }
         }
    
      
    )
    

    
});
Siteroute.route('/adduser').post(function(req, res) {
    Siteuserd.findOne({ _id: req.body.sender }, function(error, admin) {
        if (error) {
            console.log(error);
            res.send('error');
        } else if (!admin) {
            res.send('invalid');
        } else {
            // Check if the contact exists in the "contacts" array
            const existingContact = admin.contacts.find(contact => contact.userid === req.body.user);
            if (existingContact) {
                // Update the existing contact
                existingContact.unseen += req.body.unseen;
                existingContact.timestamp = Date.now();
                existingContact.usertype = 'user';
            } else {
                // Push a new contact
                admin.contacts.push({
                    userid: req.body.user,
                    unseen: req.body.unseen,
                    usertype : 'user'
                });
            }

            // Save the updated "Admin" document
            admin.save(function(error2, success2) {
                if (error2) {
                    console.log(error2);
                    res.send('error2');
                } else {
                    res.status(200).json({ 'Client': success2 });
                }
            });
        }
    });
});

Siteroute.route('/travel').post(function(req, res) {
    console.log(req.body)
    Siteuserd.findOne({ _id: req.body._id }, function(error, admin) {
        if (error) {
            console.log(error);
            res.send('error');
        } else if (!admin) {
            res.send('invalid');
        } else {
            // Check if the contact exists in the "contacts" array
            const existingContact = admin.travel.find(contact => (contact.date === req.body.date&&contact.end==='-'));
            console.log(existingContact)
            if (existingContact&&req.body.coords) {

                if(req.body.coords&&req.body.coords.length!==2000){
  // Update the existing contact
  existingContact.end = req.body.end;
                }
              


                existingContact.coords= [...req.body.coords,...existingContact.coords];
            } else {
                // Push a new contact
                admin.travel.push({
                    coords:[],
                    date:req.body.date,
                    start:req.body.start,
                    end:'-'

                    
                });
            }
                // Push a new contact
              
     

            // Save the updated "Admin" document
            admin.save(function(error2, success2) {
                if (error2) {
                 
                    res.send('error2');
                } else {
                    res.status(200).json({ 'Client': success2 });
                }
            });
        }
    });
});

Siteroute.route('/findtravel').post(function(req, res) {
    console.log(req.body)
    Siteuserd.findOne({ _id: req.body._id }, function(error, admin) {
        if (error) {
            console.log(error);
            res.send('error');
        } else if (!admin) {
            res.send('invalid');
        } else {
            // Check if the contact exists in the "contacts" array
            const existingContact = admin.travel.find(contact => (contact.date === req.body.date&&contact.end==='-'));
            if (existingContact) {
                // Update the existing contact
              
                res.status(200).json({ 'travellog': true });
            } else {
                res.status(200).json({ 'travellog': false });
            }
                // Push a new contact
              
     

            // Save the updated "Admin" document
          
        }
    });
});

Siteroute.route('/viewed').post(function(req, res) {
    Siteuserd.findOne({ _id: req.body.sender }, function(error, admin) {
        if (error) {
            console.log(error);
            res.send('error');
        } else if (!admin) {
            res.send('invalid');
        } else {
            // Check if the contact exists in the "contacts" array
            const existingContact = admin.contacts.find(contact => contact.userid === req.body.user);
            if (existingContact) {
                // Update the existing contact
                existingContact.unseen = 0;
            } else {
                // Push a new contact
                admin.contacts.push({
                    userid: req.body.user,
                    unseen: req.body.unseen,
                });
            }

            // Save the updated "Admin" document
            admin.save(function(error2, success2) {
                if (error2) {
                    console.log(error2);
                    res.send('error2');
                } else {
                    res.status(200).json({ 'Client': success2 });
                }
            });
        }
    });
});
Siteroute.route('/add').post(function(req, res) {

   
  
        Siteuserd.find(
            {
                email: req.body.email,
            },
            function(error, success) {
                if (error) {
                    console.log(error)
                    res.status(500).json({ error: 'An error occurred' });
                } else {
                    if (success.length === 0) {
                        let Siteuserds = new Siteuserd(req.body);
                        Siteuserds.save()
                            .then(Siteuserd => {
                                console.log('created')
                                res.status(200).json({'Siteuserd': 'Siteuserd added successfully'});
                            })
                            .catch(err => {
                              console.log("erer")
                            });
                            
                    } else {
                        console.log('created3')
                        res.status(200).json({ 'Siteuserd': 'user exist' });
                    }
                }
            }
        );
});


Siteroute.route('/getall').get(function(req, res) {

    Siteuserd.find(
        { }, 

       
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteuserd':success});
                }
                
             }
         }
    
      
    )
});


Siteroute.route('/inactive').get(function(req, res) {

    Siteuserd.find(
        {
            status:'Inactive'
         }, 

       
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteuserd':success});
                }
                
             }
         }
    
      
    )
});



Siteroute.route('/active').get(function(req, res) {

    Siteuserd.find(
        {
            status:'Active'
         }, 

       
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteuserd':success});
                }
                
             }
         }
    
      
    )
});


Siteroute.route('/find').post(function(req, res) {
    Siteuserd.find(
        {_id:req.body.Siteuserd_id}, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteuserd':success});
                }
                
             }
         }
    
      
    )
    

    
});
Siteroute.route('/super').get(function(req, res) {
    Siteuserd.find(
        {supermode:'true'}, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{
console.log(success)
                    res.status(200).json({'Siteuserd':success});
                }
                
             }
         }
    
      
    )
    

    
});


Siteroute.route('/findone').post(function(req, res) {
    Siteuserd.findOne(
        {_id:req.body.Siteuserd_id}, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteuserd':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteroute.route('/findbyname').post(function(req, res) {
    Siteuserd.find(
        {name:req.body.name}, 
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteuserd':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteroute.route('/login').post(function(req, res) {
    Siteuserd.find(
        {email:req.body.email,
        password:req.body.password,
        status:'Active'
        }, 
    
       function (error, success) {
             if (error) {

              console.log(error)
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{
                  console.log(success)

                    res.status(200).json({'Siteuserd':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteroute.route('/reset').post(function(req, res) {
    console.log(req.body)
    Siteuserd.find(
        {email:req.body.email
        },
        
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{
                 if(success.length>0){
                    console.log(success)
                    const mailOptions = {
                        from: 'Password Reset', // sender address
                        to: req.body.email, // list of receivers
                        subject: `Password Reset`, // Subject line
                        html: `<h1>Your Otp for password reset is  ${req.body.otp}.</h1>`// plain text body
                    };
                    
                    transporter.sendMail(mailOptions, function (err, info) {
                        if(err){
                            console.log(err)
                                res.status(200).json({'Siteuserd':'fail'});}
                        else{
                            console.log(info);
                            
                    res.status(200).json({'Siteuserd':'emailok'});}
                    })
                 }
                 else{
                    
                    res.status(200).json({'Siteuserd':'fail'});
                }
                 
                }
                
             }
         }
    
      
    )
    

    
});

Siteroute.route('/delete').post(function(req, res) {
    console.log(req.body)
    var ids= req.body.ids
    Siteuserd.deleteMany(
        { _id:{ $in: ids }}, 
    
       function (error, success) {
             if (error) {
                res.send(error)
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteuserd':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteroute.route('/addchat').post(function(req, res) {
    console.log(req.body)
    Siteuserd.findOneAndUpdate(
        { _id:req.body._id}, 

        {$push:{
            addedusers:{
            userid:req.body.userid,
            role:req.body.role,
            username:req.body.name,
            status:req.body.status

            }   
        } 

        },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){
console.log(success)
                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteuserd':success});
                }
                
             }
         }
    
      
    )
    

    
});


Siteroute.route('/updatelinkedsites').post(function(req, res) {
    console.log(req.body)
    Siteuserd.findOneAndUpdate(
        { _id:req.body._id}, 

        {$push:{
            linkedsites:{
            projectid:req.body.pid
            }   
        } 

        },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'User':success});
                }
                
             }
         }
    
      
    )
    

    
});

Siteroute.route('/updateuserprofile').post(function(req, res) {
    console.log(req.body)
    Siteuserd.findOneAndUpdate(
        { _id:req.body._id}, 

        {$push:{
            ids:{
            idname:req.body.id,
            idurl:req.body.idurl
            }   
        } 

        },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'User':success});
                }
                
             }
         }
    
      
    )
    

    
});
Siteroute.route('/removecert').post(function(req, res) {
    console.log(req.body)
    Siteuserd.findOneAndUpdate(
        { _id:req.body._id}, 

        {$pull:{
            ids:{
            front:req.body.idurl
            }   
        } 

        },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'User':'deleted'});
                }
                
             }
         }
    
      
    )
    

    
});

Siteroute.route('/updatecpr2').get(function(req, res) {

    Siteuserd.updateMany(
        
         

        {$set: { cpr: 5 } ,
        // Add the field if it doesn't exist
    },
        {
           
            new: true
        }
        

        ,
    
       function (error, success) {
             if (error) {
                console.log(error)
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'User':success});
                }
                
             }
         }
    
      
    )
    

    
});



Siteroute.route('/updateuserhours').post(function(req, res) {
    var datec2=new Date()
    var ustime2=datec2.toLocaleString("en-US", {timeZone: "America/New_York"})
  
    const updateData = req.body.preparedata;
console.log(req.body)
    // Create an array of update operations
    const updateOperations = updateData.map(item => ({
      updateOne: {
        filter: { _id: item.userid }, // Assuming your ID field is named _id
        update: { $set: { hrs: Number(item.Hrs)+Number(item.Ot_Hrs),hrsweek:ustime2.split(',')[0] } },
        upsert: false, // Set to true if you want to insert a new document if the ID doesn't exist
      },
    }));
  
    // Use bulkWrite to execute multiple update operations
    Siteuserd.bulkWrite(updateOperations, { ordered: false }, function(error, result) {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating documents' });
      } else {
        if (result.modifiedCount > 0) {
          res.status(200).json({ message: `${result.modifiedCount} documents updated successfully` });
        } else {
          res.status(200).json({ message: 'No documents were updated' });
        }
      }
    });
    

    
});
Siteroute.route('/updatecpr').post(function(req, res) {
    Siteuserd.findOneAndUpdate(
        { _id:req.body.id}, 

        {
           
            cprapply:req.body.cprapply

        },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteuserd':success});
                }
                
             }
         }
    
      
    )
    

    
});
Siteroute.route('/changemode').post(function(req, res) {
    Siteuserd.findOneAndUpdate(
        { _id:req.body._id}, 

        {
           
            superallow:req.body.mode

        },
    
       function (error, success) {
             if (error) {
                res.send('error')
             } else {
                if(!success){

                    res.send('invalid')
                }
                else{

                    res.status(200).json({'Siteuserd':success});
                }
                
             }
         }
    
      
    )
    

    
});










module.exports = Siteroute;
