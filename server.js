


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT =  process.env.PORT || 4001;
const path=require("path");

const Userroute = require('./Routes/Users.route');
const Attroute = require('./Routes/Att.route');
const Projectroute = require('./Routes/Project.route');
const Leaveroute = require('./Routes/Leave.route');
const Noteroute = require('./Routes/Notes.route');
const Siteroute = require('./Routes/Siteuser.route');
const Jobsiteroute = require('./Routes/Site.route');
const Clientroute = require('./Routes/Client.route');
const Skillsroute = require('./Routes/Skills.route');
const Siteattroute = require('./Routes/Siteatt.route');
const Notiroute = require('./Routes/Noti.route');
const Adminroute = require('./Routes/Admin.route');
const Supervisorroute = require('./Routes/Supervisor.route');
const Invoiceroute = require('./Routes/Invoice.route');
const Formroute = require('./Routes/Formdata');
__dirname=path.resolve()
app.use(express.static(path.join(__dirname,'./myapp/build')))

app.use(cors({origin: '*'}));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});





app.use(cors());
app.use(bodyParser.json());
mongoose.connect(
    'mongodb+srv://admin:1234@cluster0.zhkxjsf.mongodb.net/?retryWrites=true&w=majority'
    , { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', async function() {
    console.log("MongoDB database connection established successfully");

    
});





app.use('/api/user', Userroute);
app.use('/api/att', Attroute);
app.use('/api/project', Projectroute);
app.use('/api/leave', Leaveroute);
app.use('/api/note', Noteroute);
app.use('/api/siteuser', Siteroute);
app.use('/api/jobsite', Jobsiteroute);
app.use('/api/client',   Clientroute  );
app.use('/api/skills',   Skillsroute  );
app.use('/api/siteatt',   Siteattroute  );
app.use('/api/noti',  Notiroute  );
app.use('/api/admin',Adminroute  );
app.use('/api/super',Supervisorroute  );
app.use('/api/invoice',Invoiceroute  );
app.use('/api/data',Formroute  );






app.get('*',(req,res)=>{
    res.sendFile( path.resolve(__dirname,'./myapp','build','index.html'))

})
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});