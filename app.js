
const express = require("express");
const server = express();

const bodyParser = require("body-parser")
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

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

const seatSchema = new mongoose.Schema({
    seat_id: { type: String, required: true },
    laboratory: { type: String, required: true }
}, { versionKey: false });

const reserveSchema = new mongoose.Schema({
    computer_lab: { "type": "String", "required": true },
    date: { "type": "String", "required": true },
    time_slot: { "type": "String", "required": true },
    email: { "type": "String", "required": true },
    user: { "type": "String", "required": true },
    seat_num: { "type": "String", "required": true }
})

const seatModel = mongoose.model('seat', seatSchema);

const reservationModel = mongoose.model('reservation', reserveSchema);

const seatSearchQuery = {};


server.get('/test', function (req, resp) {
    resp.render('signIn', {
        layout: 'layoutSignIn',
        title: 'ILABS | Sign In',
    });
});

server.get('/userLoginStudent', function (req, resp) {
    resp.render('userLoginStudent', {
        layout: 'layoutLogin',
        title: 'ILABS | User Log-in',
    });
});

server.get('/userLoginTech', function (req, resp) {
    resp.render('userLoginTech', {
        layout: 'layoutLogin',
        title: 'ILABS | User Log-in',
    });
});

server.get('/logoutTech', function (req, resp) {
    resp.render('logoutTech', {
        layout: 'layoutLogout',
        title: 'ILABS | Log-Out',
    });
});

server.get('/logoutStudent', function (req, resp) {
    resp.render('logoutStudent', {
        layout: 'layoutLogout',
        title: 'ILABS | Log-Out',
    });
});


server.post('/load_seats', function (req, resp) {
    console.log("loadingg....");
    const reservationSearchQuery = { computer_lab: req.body.lab, date: req.body.date, time_slot: req.body.time };

    reservationModel.find(reservationSearchQuery).lean().then(function (reserve_data) {
        console.log("loading pt2");
        resp.json({ reservations: reserve_data });
        console.log("loading pt3");
    }).catch(errorFn)
})

server.get('/', function (req, resp) {
    seatModel.find(seatSearchQuery).lean().then(function (seat_data) {
        seat_data.forEach(function (seat) {
            seat.availability = "available";
            // seat.availability = checkAvailability(date, time, seat);
        });
        resp.render('bookReserve', {
            layout: 'layoutReserve',
            title: 'ILabs | Book Reserve',
            'seat-data': seat_data
        });
    }).catch(errorFn);
});

server.get('/student-home', function (req, resp) {
    console.log('Student home loaded!')
    resp.render('sHome', {
        layout: 'index',
        title: 'ILABS | Student Homepage',
        css: './css/landing.css'
    });
});

server.get('/indexStudent', function (req, resp) {
    resp.render('indexStudent', {
        layout: 'layoutReserveHome',
        title: 'ILabs | Student HOME'
    });
});

server.get('/reserveStudent', function (req, resp) {
    resp.render('reserveStudent', {
        layout: 'layoutReserveHome',
        title: 'ILabs | Reserve'
    });
});

server.get('/viewSchedules', function (req, resp) {
    resp.render('viewSchedules', {
        layout: 'layoutReserve',
        title: 'ILabs | Schedules'
    });
});


server.get('/viewMyReservations', function (req, resp) {
    resp.render('viewMyReservations', {
        layout: 'layoutReserve',
        title: 'ILabs | View My Reservations'
    });
});

server.get('/userProfile/student', function (req, resp) {
    resp.render('userProfileStudent', {
        layout: 'index',
        title: 'ILabs | Edit My Profile',
        css: 'userprofile.css',
        profileimg: '',
        firstname: '',
        lastname: '',
        idnum: ''
    });
});

server.get('/userProfile/technician', function (req, resp) {
    resp.render('userProfileTech', {
        layout: 'index',
        title: 'ILabs | Edit My Profile',
        css: 'userprofile.css',
        profileimg: '',
        firstname: '',
        lastname: '',
        labnum: ''
    });
});

server.get('/userProfile/student/edit', function (req, resp) {
    resp.render('editProfileStudent', {
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

server.get('/userProfile/technician/edit', function (req, resp) {
    resp.render('editProfileTech', {
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

server.get('/userProfile/technician/deleteProfile', function (req, resp) {
    resp.render('deleteProfileTech', {
        layout: 'index',
        title: 'ILabs | Delete My Profile',
        css: 'editprofile.css'
    });
});

server.get('/userProfile/student/deleteProfile', function (req, resp) {
    resp.render('deleteProfileStudent', {
        layout: 'index',
        title: 'ILabs | Delete My Profile',
        css: 'editprofile.css'
    });
});

server.get('/deleteProfile=Success', function (req, resp) {
    resp.render('deleteSuccessful', {
        layout: 'index',
        title: 'ILabs | Delete Success',
        css: 'editprofile.css'
    });
});

const port = process.env.PORT | 9090;
server.listen(port, function () {
    console.log("Listening at port " + port);
});
