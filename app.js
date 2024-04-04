// install command:
// npm i express body-parser express-handlebars express-session bcrypt mongoose handlebars-helpers

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

const bcrypt = require('bcrypt');

server.use(express.static('public'));

const defaultprofileimg = '/common/defaultimg.png';

const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

//let uri = "mongodb+srv://samanthaoneil:WkvdF4yzhZ0JoVec@cluster0.wezgvio.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
let uri = ""
//mongoose.connect(uri);

mongoose.connect(uri)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch(error => console.error("Error connecting to MongoDB Atlas:", error));

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
}, { versionKey: false });

const seatModel = mongoose.model('seat', seatSchema);

const reservationModel = mongoose.model('reservation', reserveSchema);

const seatSearchQuery = {};


server.get('/', function (req, resp) {
    resp.render('signIn', {
        layout: 'layoutSignIn',
        title: 'ILABS | Sign In',
    });
});

server.get('/signIn', function (req, resp) { //For logging out
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


server.post('/studentRegister', function (req, resp) {

    const tempModel = new studentModel({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        id_num: req.body.id_num,
        dlsu_email: req.body.dlsu_email,
        password: req.body.PW,
        profileimg: req.body.profileimg
    });

    const searchQuery = {
        username: tempModel.username
    };

    if (!tempModel.profileimg) {
        tempModel.profileimg = defaultprofileimg;
    }

    console.log(tempModel);

    studentModel.findOne(searchQuery).lean().then(function (studentData) {
        if (!studentData) {
            bcrypt.hash(tempModel.password, 10, (err, hashedPW) => {
                if (err) {
                    console.log('Error hashing password');
                    return;
                }

                const studentInstance = new studentModel({
                    first_name: tempModel.first_name,
                    last_name: tempModel.last_name,
                    username: tempModel.username,
                    id_num: tempModel.id_num,
                    dlsu_email: tempModel.dlsu_email,
                    password: hashedPW,
                    profileimg: tempModel.profileimg
                });

                studentInstance.save().then(function (register) {
                    console.log('Account Created!');
                    console.log(studentInstance);
                    resp.render('createSuccessStudent', {
                        layout: 'index',
                        title: 'ILABS | Register Success!',
                        css: 'userRegistration.css'
                    });
                }).catch(errorFn);
            });
        } else if (studentData.username === tempModel.username) {
            // if this errors then dont continue with the rest
            resp.status(400).send('Username already exists');
        }
    });
});


server.get('/createSuccessStudent', function (req, resp) {
    resp.render('createSuccessStudent', {
        layout: 'layoutSignIn',
        title: 'ILABS | Student Registered!',
    });
});

server.get('/createSuccessTech', function (req, resp) {
    resp.render('createSuccessTech', {
        layout: 'layoutSignIn',
        title: 'ILABS | Technician Registered!',
    })
})

server.get('/deleteProfile', function (req, resp) { })

server.get('/techRegister', function (req, resp) {
    resp.render('techRegister', {
        layout: 'index',
        title: 'ILABS | Sign-Up',
        css: 'userRegister.css'
    });
});

server.post('/techRegister', function (req, resp) {
    const tempModel = new techModel({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        tech_code: req.body.tech_code,
        dlsu_email: req.body.dlsu_email,
        password: req.body.PW,
        profileimg: req.body.profileimg
    });

    const searchQuery = {
        username: tempModel.username
    };

    if (!tempModel.profileimg) {
        tempModel.profileimg = defaultprofileimg;
    }

    console.log(tempModel);

    techModel.findOne(searchQuery).lean().then(function (tech_data) {
        if (!tech_data) {
            bcrypt.hash(tempModel.password, 10, (err, hashedPW) => {
                if (err) {
                    console.log('Error hashing password');
                    return;
                }

                const techInstance = new techModel({
                    first_name: tempModel.first_name,
                    last_name: tempModel.last_name,
                    username: tempModel.username,
                    tech_code: tempModel.tech_code,
                    dlsu_email: tempModel.dlsu_email,
                    password: hashedPW,
                    profileimg: tempModel.profileimg
                });

                techInstance.save().then(function (register) {
                    console.log('Technician Account Created!');
                    console.log(techInstance);
                    resp.render('createSuccessTech', {
                        layout: 'index',
                        title: 'ILABS | Register Success!',
                        css: 'userRegistration.css'
                    });
                }).catch(errorFn);
            }); 
        } else if (tech_data.username === tempModel.username) {
            resp.status(400).send('Username already exists');
        }
    });
});

server.get('/userLoginStudent', function (req, resp) {
    resp.render('userLoginStudent', {
        layout: 'layoutLogin',
        title: 'ILABS | User Log-in',
    });
});

server.post('/s-login-funck', function (req, resp) {
    const username = req.body.username;
    console.log('INPUT: ' + username);
    const pass = req.body.password;

    studentModel.findOne({ username: username }).lean().then(function (student) {
        console.log('Finding user');
        console.log(student);
        if (student != undefined && student._id != null) {
            req.session.username = username;
            console.log(student.username);
            if (student) {
                bcrypt.compare(pass, student.password, function (err, res) {
                    if (res) {
                        console.log('match');
                        resp.render('sHome', {
                            layout: 'index',
                            title: 'ILABS | Student Homepage',
                            css: 'landing.css'
                        });
                    } else {
                        console.log("username not found");
                        resp.render('userLoginStudent', {
                            layout: 'layoutLogin',
                            title: 'ILABS | User Log-in',
                        });
                    }
                });
            }            
            else {
                console.log("username not found");
                resp.render('userLoginStudent', {
                    layout: 'layoutLogin',
                    title: 'ILABS | User Log-in',
                });
            }
        } else {
            console.log("no match");
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
    console.log(reservationSearchQuery);

    reservationModel.find(reservationSearchQuery).lean().then(function (reserve_data) {
        console.log("loading pt2");
        resp.json({ reservations: reserve_data });
        console.log("loading pt3");
    }).catch(errorFn)
})

server.post('/load_reservationInfo', function (req, resp) {
    console.log("view");
    const reservationSearchQuery = { computer_lab: req.body.lab, date: req.body.date, time_slot: req.body.time, seat_num: req.body.seat };
    console.log(reservationSearchQuery);

    reservationModel.findOne(reservationSearchQuery).lean().then(function (reserve_data) {
        console.log(reserve_data);
        resp.json({ reservations: reserve_data });
    }).catch(errorFn)
})

server.get('/bookReserve', function (req, resp) {
    seatModel.find(seatSearchQuery).lean().then(function (seat_data) {
        resp.render('bookReserve', {
            layout: 'layoutReserve',
            title: 'ILabs | Book Reserve',
            'seat-data': seat_data,
            'username': req.session.username
        });
    }).catch(errorFn);
});

server.get('/bookReserveTech', function (req, resp) {
    seatModel.find(seatSearchQuery).lean().then(function (seat_data) {
        resp.render('bookReserveTech', {
            layout: 'layoutReserve',
            title: 'ILabs | Book Reserve',
            'seat-data': seat_data,
        });
    }).catch(errorFn);
});

server.post('/reserveFunctionStudent', function (req, resp) {
    const u_name = req.body.username;
    const email = req.body.email;
    const lab = req.body.laboratory;
    const date = req.body.date;
    const time = req.body.time;
    const chosen_seat = req.body.seat_num;

    const searchQuery = {
        username: u_name,
    };
    console.log(req.body);

    studentModel.findOne(searchQuery).lean().then(function (student) {
        if (student != undefined && student._id != null) {
            const reserveInstance = reservationModel({
                date: date,
                computer_lab: lab,
                time_slot: time,
                email: email,
                user: u_name,
                seat_num: chosen_seat
            });
            reserveInstance.save().then(function (result) {
                resp.render('reservationSuccessfulStudent', {
                    layout: 'index',
                    title: 'ILABS | Reserve Successful',
                    css: 'landing.css',
                    username: u_name,
                    email: email,
                    date: date,
                    laboratory: lab,
                    time: time,
                    seat: chosen_seat
                });
            }).catch(errorFn);
            console.log('match');
            console.log("rendered");
        } else {
            console.log("no match :(");
            seatModel.find(seatSearchQuery).lean().then(function (seat_data) {
                resp.render('bookReserve', {
                    layout: 'layoutReserve',
                    title: 'ILabs | Book Reserve',
                    'seat-data': seat_data,
                    username: req.session.username,
                    alert_message: "no matching user"
                });
            }).catch(errorFn);
        }
    }).catch(errorFn);
});

server.post('/reserveFunctionTech', function (req, resp) {
    const u_name = req.body.username;
    const email = req.body.email;
    const lab = req.body.laboratory;
    const date = req.body.date;
    const time = req.body.time;
    const chosen_seat = req.body.seat_num;

    console.log(req.body);
    const reserveInstance = reservationModel({
        date: date,
        computer_lab: lab,
        time_slot: time,
        email: email,
        user: u_name,
        seat_num: chosen_seat
    });
    reserveInstance.save().then(function (result) {
        resp.render('reservationSuccessfulTech', {
            layout: 'index',
            title: 'ILABS | Reserve Successful',
            css: 'landing.css',
            username: u_name,
            email: email,
            date: date,
            laboratory: lab,
            time: time,
            seat: chosen_seat
        });
    }).catch(errorFn);



    console.log("rendered");

});

server.get('/student-home', function (req, resp) {
    if (req.session.username == "" || req.session.username == null) {
        resp.render('signIn', {
            layout: 'layoutSignIn',
            title: 'ILABS | Sign In',
        });
    } else {
        resp.render('sHome', {
            layout: 'index',
            title: 'ILABS | Student Homepage',
            css: 'landing.css'
        });
    }
});

server.get('/sHome', function (req, resp) {
    console.log(req.session.username);
    if (req.session.username == "" || req.session.username == null) {
        resp.render('signIn', {
            layout: 'layoutSignIn',
            title: 'ILABS | Sign In',
        });
    } else {
        resp.render('sHome', {
            layout: 'index',
            title: 'ILABS | Student Homepage',
            css: 'landing.css'
        });
    }

});

server.get('/indexTech', function (req, resp) {
    if (req.session.username == "" || req.session.username == null) {
        resp.render('signIn', {
            layout: 'layoutSignIn',
            title: 'ILABS | Sign In',
        });
    } else {
        resp.render('indexTech', {
            layout: 'index',
            title: 'ILABS | Lab Technician Homepage',
            css: 'landing.css'
        });
    }
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
            layout: 'layoutReserveView',
            title: 'ILabs | View Schedules',
            'seat-data': seat_data
        });
    }).catch(errorFn);
});

server.get('/filterReservations', function (req, resp) {
    const searchQuery = { user: req.session.username, computer_lab: req.body.lab, date: req.body.date, time: req.body.time };
    reservationModel.find(searchQuery).lean().then(function (reserve_data) {
        console.log('loading user reservations');

        let filtered_reservations = new Array();
        for (const item of reserve_data) {
            filtered_reservations.push({
                computer_lab: item.computer_lab,
                date_reserved: item.date,
                time_slot: item.time_slot,
                email: item.email,
                user: item.user,
                seat_num: item.seat_num
            });
        }
        resp.send(filtered_reservations);
    }).catch(errorFn);

})
server.get('/viewMyReservations', function (req, resp) {
    const searchQuery = { user: req.session.username };//user details query
    console.log("search query for view" + searchQuery);

    reservationModel.find(searchQuery).lean().then(function (reserve_data) {
        console.log('loading user reservations');

        let my_reserve_data = new Array();
        for (const item of reserve_data) {
            my_reserve_data.push({
                computer_lab: item.computer_lab,
                date_reserved: item.date,
                time_slot: item.time_slot,
                email: item.email,
                user: item.user,
                seat_num: item.seat_num
            });
        }

        console.log(my_reserve_data);

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
                date_reserved: item.date,
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
    const studentSearchQuery = { username: req.session.username };

    const reservationSearchQuery = { user: req.session.username };

    studentModel.findOne(studentSearchQuery).lean().then(function (student_data) {
        console.log("Loading Student Data");
        console.log(student_data);

        reservationModel.findOne(reservationSearchQuery).lean().then(function (reservation_data) {
            console.log("Loading Reservation Data");
            console.log(reservation_data);
            console.log(student_data);
            // Render
            resp.render('userProfileStudent', {
                layout: 'index',
                title: 'ILABS | Edit My Profile',
                css: 'userprofile.css',
                first_name: student_data.first_name,
                last_name: student_data.last_name,
                dlsu_email: student_data.dlsu_email,
                id_num: student_data.id_num,
                profileimg: student_data.profileimg,
                reservation_data: reservation_data
            });
        }).catch(errorFn);
    }).catch(errorFn);
});

server.get('/userProfileTech', function (req, resp) {

    techModel.findOne({ username: req.session.username }).lean().then(function (technician_data) {
        console.log("Loading Technician Data");
        console.log(technician_data);

        reservationModel.find({}).lean().then(function (reserve_data) {
            console.log("Loading Reservation Data");
            console.log(reserve_data);

            // Render
            resp.render('userProfileTech', {
                layout: 'index',
                title: 'ILABS | Edit My Profile',
                css: 'userprofile.css',
                first_name: technician_data.first_name,
                last_name: technician_data.last_name,
                dlsu_email: technician_data.dlsu_email,
                tech_code: technician_data.tech_code,
                profileimg: technician_data.profileimg,
                reserve_data: reserve_data
            });
        }).catch(errorFn);
    }).catch(errorFn);
});

//EDIT PROFILE STUDENT
server.get('/editProfileStudent', function (req, resp) {

    studentModel.findOne({ username: req.session.username }).lean().then(function (student_data) {
        resp.render('editProfileStudent', {
            layout: 'index',
            title: 'ILABS | Edit My Profile',
            css: 'userRegister.css',
            first_name: student_data.first_name,
            last_name: student_data.last_name,
            username: student_data.username,
            id_num: student_data.id_num,
            dlsu_email: student_data.dlsu_email
        });
    }).catch(errorFn);
});

server.post('/editProfileFunctionStudent', function (req, resp) {

    studentModel.findOne({ username: req.session.username }).then(function (student_data) {
        student_data.first_name = req.body.first_name;
        student_data.last_name = req.body.last_name;
        student_data.username = req.body.username;
        req.session.username = req.body.username;
        student_data.id_num = req.body.id_num;

        console.log('edited');
        console.log(student_data);

        student_data.save().then(function (result) {
            if (result) {
                console.log('saved');
                resp.render('alertPage', {
                    layout: 'index',
                    title: 'ILABS | Edit Successful',
                    css: 'editprofile.css',
                    alert: 'Edit Saved and Successful',
                    redirect_page: 'Profile Page',
                    redirect_url: '/userProfileStudent'
                })
            }
        }).catch(errorFn);
    }).catch(errorFn);
});

server.post('/editProfilePasswordStudent', function (req, resp) {

    if (req.body.password1 !== req.body.password2) {
        console.error("Passwords don't match!");
        console.log('changes not saved');
        return;
    }

    bcrypt.hash(req.body.password1, 10, (err, hashedPW) => {
        if (err) {
            console.error('Error hashing password:', err);
            resp.render('alertPage', {
                layout: 'index',
                title: 'ILABS | Hashing Unsuccessful',
                css: 'editprofile.css',
                alert: 'Error Hashing Password',
                redirect_page: 'Edit Profile Page',
                redirect_url: '/editProfileStudent'
            })
            return;
        }
    });

        studentModel.findOne({ username: req.session.username }).then(function (student_data) {
            student_data.password = req.body.password1;
            student_data.password = hashedPW;

            console.log('edited');
            console.log(student_data);

            student_data.save().then(function (result) {
                if (result) {
                    console.log('saved');
                    resp.render('alertPage', {
                        layout: 'index',
                        title: 'ILABS | Edit Password Successful',
                        css: 'editprofile.css',
                        alert: 'Edit Saved and Successful',
                        redirect_page: 'Profile Page',
                        redirect_url: '/userProfileStudent'
                    })
                }
            }).catch(errorFn);
        }).catch(errorFn);
    });


//EDIT PROFILE TECH
server.get('/editProfileTech', function (req, resp) {

    techModel.findOne({ username: req.session.username }).lean().then(function (technician_data) {
        resp.render('editProfileTech', {
            layout: 'index',
            title: 'ILABS | Edit My Profile',
            css: 'userRegister.css',
            first_name: technician_data.first_name,
            last_name: technician_data.last_name,
            username: technician_data.username,
            tech_code: technician_data.tech_code,
            dlsu_email: technician_data.dlsu_email
        });
    }).catch(errorFn);

});

server.post('/editProfileFunctionTech', function (req, resp) {

    techModel.findOne({ username: req.session.username }).then(function (technician_data) {
        technician_data.first_name = req.body.first_name;
        technician_data.last_name = req.body.last_name;
        technician_data.username = req.body.username;
        req.session.username = req.body.username;
        technician_data.id_num = req.body.id_num;

        console.log('edited');
        console.log(technician_data);

        technician_data.save().then(function (result) {
            if (result) {
                console.log('saved');
                resp.render('alertPage', {
                    layout: 'index',
                    title: 'ILABS | Edit Successful',
                    css: 'editprofile.css',
                    alert: 'Edit Saved and Successful',
                    redirect_page: 'Profile Page',
                    redirect_url: '/userProfileTech'
                })
            }
        }).catch(errorFn);
    }).catch(errorFn);
});

server.post('/editProfilePasswordTech', function (req, resp) {

    if (req.body.password1 !== req.body.password2) {
        console.error("Passwords don't match!");
        console.log('changes not saved');

        return;
    }

    bcrypt.hash(req.body.password1, 10, (err, hashedPW) => {
        if (err) {
            console.error('Error hashing password:', err);
            resp.render('alertPage', {
                layout: 'index',
                title: 'ILABS | Hashing Unsuccessful',
                css: 'editprofile.css',
                alert: 'Error Hashing Password',
                redirect_page: 'Edit Profile Page',
                redirect_url: '/editProfileTech'
            })
            return;
        }
    });

        techModel.findOne({ username: req.session.username }).then(function (technician_data) {
            //technician_data.password = req.body.password1;
            technician_data.password = hashedPW;
            console.log('edited');
            console.log(technician_data);

            technician_data.save().then(function (result) {
                if (result) {
                    console.log('saved');
                    resp.render('alertPage', {
                        layout: 'index',
                        title: 'ILABS | Edit Password Successful',
                        css: 'editprofile.css',
                        alert: 'Edit Saved and Successful',
                        redirect_page: 'Profile Page',
                        redirect_url: '/userProfileTech'
                    })
                }
            }).catch(errorFn);
        }).catch(errorFn);
    });

server.get('/deleteProfileTech', function (req, resp) {
    resp.render('deleteProfileTech', {
        layout: 'index',
        title: 'ILabs | Delete My Profile',
        css: 'editprofile.css'
    });
});

server.get('/deleteProfileStudent', function (req, resp) {
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

server.post('/editReservationTech', function (req, resp) {
    //const searchQuery = { username: req.session.username };
    const reservationSearchQuery = { user: req.body.username, computer_lab: req.body.lab, date: req.body.date, time_slot: req.body.time };
    console.log(reservationSearchQuery);

    seatModel.find(seatSearchQuery).lean().then(function (seat_data) {
        reservationModel.findOne(reservationSearchQuery).lean().then(function (reservation) {
            console.log(reservation);
            resp.render('editReservationTech', {
                layout: 'index',
                title: 'ILABS | Edit Reservation',
                css: 'reserveStyle.css',
                username: reservation.user,
                dlsu_email: reservation.email,
                seat_num: reservation.seat_num,
                time_slot: reservation.time_slot,
                date: reservation.date,
                'seat-data': seat_data
            });
        }).catch(errorFn);
    }).catch(errorFn);


});

server.post('/editReservationStudent', function (req, resp) {
    const searchQuery = { username: req.session.username };
    const reservationSearchQuery = { user: req.body.username, computer_lab: req.body.lab, date: req.body.date, time_slot: req.body.time };
    console.log(reservationSearchQuery);

    seatModel.find(seatSearchQuery).lean().then(function (seat_data) {
        reservationModel.findOne(reservationSearchQuery).lean().then(function (reservation) {
            console.log(reservation);
            console.log(req.body.username);
            resp.render('editReservationStudent', {
                layout: 'index',
                title: 'ILABS | Edit Reservation',
                css: 'reserveStyle.css',
                username: reservation.user,
                dlsu_email: reservation.email,
                seat_num: reservation.seat_num,
                time_slot: reservation.time_slot,
                date: reservation.date,
                'seat-data': seat_data
            });
        }).catch(errorFn);
    }).catch(errorFn);

});

server.get('/signIn', function (req, resp) {
    resp.render('signIn', {
        layout: 'layoutSignIn',
        title: 'ILABS | Sign In',
    });
});

const port = process.env.PORT | 9090;
server.listen(port, function () {
    console.log("Listening at port " + port);
});
