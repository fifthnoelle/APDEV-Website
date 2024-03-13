const express = require("express");
const session = require('express-session');
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

//initialize session
server.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));

const techSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, required: true },
    tech_code: { type: String, required: true },
    dlsu_email: { type: String, required: true },
    password: { type: String, required: true },
    profileimg: { type: String }
}, { versionKey: false });

const studentSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, required: true },
    id_num: { type: String, required: true },
    dlsu_email: { type: String, required: true },
    password: { type: String, required: true },
    profileimg: { type: String }
}, { versionKey: false });

const studentModel = mongoose.model('student', studentSchema);

const techModel = mongoose.model('technician', techSchema);

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


server.get('/', function (req, resp) {
    resp.render('signIn', {
        layout: 'layoutSignIn',
        title: 'ILABS | Sign In',
    });
});

server.get('/studentRegister', function (req, resp) {
    resp.render('studentRegister', {
        layout: 'index',
        title: 'ILABS | Sign-Up',
        css: 'userRegister.css'
    });
});

server.get('/techRegister', function (req, resp) {
    resp.render('techRegister', {
        layout: 'index',
        title: 'ILABS | Sign-Up',
        css: 'userRegister.css'
    });
});

server.get('/userLoginStudent', function (req, resp) {
    resp.render('userLoginStudent', {
        layout: 'layoutLogin',
        title: 'ILABS | User Log-in',
    });
});

console.log('find student user....');
server.post('/s-login-funck', function (req, resp) {
    const u_name = String(req.body.username);
    const pass = String(req.body.password);
    const searchQuery = {
        username: u_name,
        password: pass
    };

    studentModel.findOne(searchQuery).lean().then(function (student) {
        if (student != undefined && student._id != null) {
            req.session.username = u_name;
            console.log('match');
            resp.render('sHome', {
                layout: 'index',
                title: 'ILABS | Student Homepage',
                css: 'landing.css'
            });
        } else {
            resp.render('logoutStudent', {
                layout: 'layoutLogout',
                title: 'ILABS | Log-Out'
            });
        }
    }).catch(errorFn);
});


server.get('/userLoginTech', function (req, resp) {
    resp.render('userLoginTech', {
        layout: 'layoutLogin',
        title: 'ILABS | User Log-in',
    });
});

console.log('find technician user....');
server.post('/t-login-funck', function (req, resp) {
    const u_name = String(req.body.username);
    const pass = String(req.body.password);
    const searchQuery = {
        username: u_name,
        password: pass
    };

    techModel.findOne(searchQuery).lean().then(function (technician) {
        if (technician != undefined && technician._id != null) {
            req.session.username = u_name;
            console.log('match');
            resp.render('indexTech', {
                layout: 'index',
                title: 'ILABS | Lab Technician Homepage',
                css: 'landing.css'
            });
        } else {
            resp.render('logoutTech', {
                layout: 'layoutLogout',
                title: 'ILABS | Log-Out',
            });
        }
    }).catch(errorFn);
});

server.get('/forgotPasswordTech', function (req, resp) {
    resp.render('forgotPasswordTech', {
        layout: 'layoutLogin',
        title: 'ILABS | Forgot Password'
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

server.get('/bookReserve', function (req, resp) {
    seatModel.find(seatSearchQuery).lean().then(function (seat_data) {
        seat_data.forEach(function (seat) {
            seat.availability = "available";
            // seat.availability = checkAvailability(date, time, seat);
        });
        resp.render('bookReserve', {
            layout: 'layoutReserve',
            title: 'ILabs | Book Reserve',
            'seat-data': seat_data,
            'username' : req.session.username
        });
    }).catch(errorFn);
});

server.get('/student-home', function (req, resp) {
    console.log('Student home loaded!')
    resp.render('sHome', {
        layout: 'index',
        title: 'ILABS | Student Homepage',
        css: 'landing.css'
    });
});

server.get('/sHome', function (req, resp) {
    resp.render('sHome', {
        layout: 'index',
        title: 'ILABS | Student Homepage',
        css: 'landing.css'
    });
});

server.get('/indexTech', function (req, resp) {
    resp.render('indexTech', {
        layout: 'index',
        title: 'ILABS | Lab Technician Homepage',
        css: 'landing.css'
    });
});

server.get('/reserveStudent', function (req, resp) {
    resp.render('reserveStudent', {
        layout: 'layoutReserveHome',
        title: 'ILabs | Reserve'
    });
});

server.get('/reserveTech', function (req, resp) {
    resp.render('reserveTech', {
        layout: 'layoutReserveHome',
        title: 'ILabs | Reserve'
    });
});

server.get('/viewSchedules', function (req, resp) {
    seatModel.find(seatSearchQuery).lean().then(function (seat_data) {
        seat_data.forEach(function (seat) {
            seat.availability = "available";
        });
        resp.render('viewSchedules', {
            layout: 'layoutReserve',
            title: 'ILabs | View Schedules',
            'seat-data': seat_data
        });
    }).catch(errorFn);
});

server.get('/viewSchedulesTech', function (req, resp) {
    seatModel.find(seatSearchQuery).lean().then(function (seat_data) {
        seat_data.forEach(function (seat) {
            seat.availability = "available";
        });
        resp.render('viewSchedulesTech', {
            layout: 'layoutReserve',
            title: 'ILabs | View Schedules',
            'seat-data': seat_data
        });
    }).catch(errorFn);
});


server.get('/viewMyReservations', function (req, resp) {
    const searchQuery = {user: req.sessions.username};//user details query

    reservationModel.find(searchQuery).lean().then(function(reserve_data){
        console.log('loading user reservations');

        let my_reserve_data = new Array();
        for(const item of reserve_data){
            my_reserve_data.push({
                computer_lab : item.computer_lab,
                date: item.date,
                time_slot: item.pass,
                email: item.email,
                user: item.user,
                seat_num: item.seat_num
            });
        }

        resp.render('viewMyReservations', {
            layout: 'layoutReserve',
            title: 'ILabs | View My Reservations',
            my_reserve_data: my_reserve_data
        });
    }).catch(errorFn);
});

server.get('/viewAllReservations', function (req, resp) {
    //const searchQuery = {};//empty = all

    reservationModel.find({}).lean().then(function (reserve_data) {
        console.log('loading all reservations');

        let all_reserve_data = new Array();
        for (const item of reserve_data) {
            all_reserve_data.push({
                computer_lab: item.computer_lab,
                date_reserved: item.date_reserved,
                time_slot: item.time_slot,
                email: item.email,
                user: item.user,
                seat_num: item.seat_num
            });
        }

        resp.render('viewAllReservations', {
            layout: 'layoutReserve',
            title: 'ILabs | View All Reservations',
            all_reserve_data: all_reserve_data
        });
    }).catch(errorFn);
});

server.get('/userProfileStudent', function (req, resp) {
    // blank search query
    const searchQuery = {};

    studentModel.find(searchQuery).lean().then(function (student_data) {
        resp.render('userProfileStudent', {
            layout: 'index',
            title: 'ILabs | Edit My Profile',
            css: 'userprofile.css',
            student_data: student_data
        });
    }).catch(errorFn);
});

server.get('/userProfile/technician', function (req, resp) {
    const searchQuery = {};

    techModel.find(searchQuery).lean().then(function (technician_data) {
        resp.render('userProfileTech', {
            layout: 'index',
            title: 'ILabs | Edit My Profile',
            css: 'userprofile.css',
            technician_data: technician_data
        });
    }).catch(errorFn);
});

server.get('/userProfile/student/edit', function (req, resp) {
    const searchQuery = {};

    studentModel.find(searchQuery).lean().then(function (student_data) {
        resp.render('editProfileStudent', {
            layout: 'index',
            title: 'ILabs | Edit My Profile',
            css: 'userprofile.css',
            student_data: student_data
        });
    }).catch(errorFn);
});

server.get('/userProfile/technician/edit', function (req, resp) {
    const searchQuery = {};

    techModel.find(searchQuery).lean().then(function (technician_data) {
        resp.render('editProfileStudent', {
            layout: 'index',
            title: 'ILabs | Edit My Profile',
            css: 'userprofile.css',
            technician_data: technician_data
        });
    }).catch(errorFn);
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
