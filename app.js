
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

server.get('/', function(req, resp){
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

server.get('/editProfile/student', function(req, resp){
    resp.render('editProfileStudent',{
        layout: 'index',
        title: 'ILabs | Edit My Profile'
    });
});

server.get('/editProfile/technician', function(req, resp){
    resp.render('editProfileTech',{
        layout: 'index',
        title: 'ILabs | Edit My Profile'
    });
});

server.get('/editProfile/technician/deleteProfile', function(req, resp){
    resp.render('deleteProfileTech',{
        layout: 'index',
        title: 'ILabs | Delete My Profile'
    });
});

server.get('/editProfile/student/deleteProfile', function(req, resp){
    resp.render('deleteProfileStudent',{
        layout: 'index',
        title: 'ILabs | Delete My Profile'
    });
});




const port = process.env.PORT | 9090;
server.listen(port, function(){
	console.log("Listening at port " + port);
});
