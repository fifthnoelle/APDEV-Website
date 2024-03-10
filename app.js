
const express = require("express");
const server = express();

const bodyParser = require("body-parser")
server.use(express.json());
server.use(express.urlencoded({extended: true}));

const handlebars = require("express-handlebars");
server.set("view engine", "hbs");
server.engine("hbs", handlebars.engine({
	extname: "hbs"
}));

server.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/labs');


function errorFn(err) {
    console.log('Error found. Please trace!');
    console.error(err);
}

server.get('/', function(req, resp){
    resp.render('signIn',{
        layout: 'layoutSignIn',
        title: 'ILABS | Sign In',
    });
});

server.get('/userLoginStudent', function(req, resp){
    resp.render('userLoginStudent',{
        layout: 'layoutLogin',
        title: 'ILABS | User Log-in',
    });
});

const acctSchema = new mongoose.Schema({
    u_name: {"type": "String", "required": true},
    pass: {"type": "String", "required": true}
}, { versionKey: false })

const accountModel = mongoose.model('account', acctSchema, 'accounts');

console.log('find user....');
server.post('/login-funck', function(req, resp){
    const u_name = req.body.username;
    const pass = req.body.password;
    console.log('Request Body:', req.body);
    console.log('find user....1');
        // Define the search query for the current user
        const searchQuery = {
            u_name: username,
            pass: pass
        };

    accountModel.findOne(searchQuery).lean().then(function (account){
        console.log('find user....2');
        if(account != undefined && account._id != null){
            console.log('match');
            resp.render('bookReserve',{
                layout: 'layoutReserve',
                title: 'ILabs | Book Reserve'
            });
          }else{
            console.log('do not match');
            resp.render('logoutStudent',{
                layout: 'layoutLogout',
                title: 'ILABS | Log-Out'
            });
          }
        }).catch(errorFn);
});



server.get('/userLoginTech', function(req, resp){
    resp.render('userLoginTech',{
        layout: 'layoutLogin',
        title: 'ILABS | User Log-in',
    });
});

server.get('/logoutTech', function(req, resp){
    resp.render('logoutTech',{
        layout: 'layoutLogout',
        title: 'ILABS | Log-Out',
    });
});

server.get('/logoutStudent', function(req, resp){
    resp.render('logoutStudent',{
        layout: 'layoutLogout',
        title: 'ILABS | Log-Out',
    });
});

server.get('/student-home', function(req, resp){
	console.log('Student home loaded!')
    resp.render('sHome',{
        layout: 'index',
        title: 'ILABS | Student Homepage',
        css: './css/landing.css'
    });
});

server.get('/bookReserve', function(req, resp){
    resp.render('bookReserve',{
        layout: 'layoutReserve',
        title: 'ILabs | Book Reserve'
    });
});

server.get('/indexStudent', function(req, resp){
    resp.render('indexStudent',{
        layout: 'layoutReserveHome',
        title: 'ILabs | Student HOME'
    });
});

server.get('/reserveStudent', function(req, resp){
    resp.render('reserveStudent',{
        layout: 'layoutReserveHome',
        title: 'ILabs | Reserve'
    });
});

server.get('/viewMyReservations', function(req, resp){
    resp.render('viewMyReservations',{
        layout: 'layoutReserve',
        title: 'ILabs | View My Reservations'
    });
});

server.get('/userProfile/student', function(req, resp){
    resp.render('userProfileStudent',{
        layout: 'index',
        title: 'ILabs | Edit My Profile',
        css: 'userprofile.css',
        profileimg: '',
        firstname: '',
        lastname: '',
        idnum: ''
    });
});

server.get('/userProfile/technician', function(req, resp){
    resp.render('userProfileTech',{
        layout: 'index',
        title: 'ILabs | Edit My Profile',
        css: 'userprofile.css',
        profileimg: '',
        firstname: '',
        lastname: '',
        labnum: ''
    });
});

server.get('/userProfile/student/edit', function(req, resp){
    resp.render('editProfileStudent',{
        layout: 'index',
        title: 'ILabs | Edit My Profile',
        css: 'editprofile.css',
        profileimg: '',
        firstname: '',
        lastname: '',
        idnum: '',
        email: '',
        number: ''
    });
});

server.get('/userProfile/technician/edit', function(req, resp){
    resp.render('editProfileTech',{
        layout: 'index',
        title: 'ILabs | Edit My Profile',
        css: 'editprofile.css',
        profileimg: '',
        firstname: '',
        lastname: '',
        email: '',
        number: ''
    });
});

server.get('/userProfile/technician/deleteProfile', function(req, resp){
    resp.render('deleteProfileTech',{
        layout: 'index',
        title: 'ILabs | Delete My Profile',
        css: 'editprofile.css'
    });
});

server.get('/userProfile/student/deleteProfile', function(req, resp){
    resp.render('deleteProfileStudent',{
        layout: 'index',
        title: 'ILabs | Delete My Profile',
        css: 'editprofile.css'
    });
});

server.get('/deleteProfile=Success', function(req, resp){
    resp.render('deleteSuccessful',{
        layout: 'index',
        title: 'ILabs | Delete Success',
        css: 'editprofile.css'
    });
});




const port = process.env.PORT | 9090;
server.listen(port, function(){
	console.log("Listening at port " + port);
});
