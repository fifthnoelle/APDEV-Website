
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
    status: { type: String, required: true }, // Assuming status can be "available", "occupied", or other statuses
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

server.post('/load_seats', function (req, resp) {
    console.log("loadingg....");
    const reservationSearchQuery = {computer_lab : req.body.lab, date : req.body.date, time_slot : req.body.time}; 
    console.log(req.body.lab + " " + req.body.date + " " + req.body.time);


    reservationModel.find(reservationSearchQuery).lean().then(function (reserve_data) {
        console.log("loading pt2");
        resp.json({reservations: reserve_data });
        console.log("loading pt3");
    }).catch(errorFn)    
})

// Execute the find operation
seatModel.find(seatSearchQuery).lean().then(function (seat_data) {
    seat_data.forEach(function(seat) {
        seat.availability = "available"
        // seat.availability = checkAvailability(date, time, seat);
    });

    server.get('/', function (req, resp) {
        resp.render('bookReserve', {
            layout: 'layoutReserve',
            title: 'Serverr',
            'seat-data': seat_data, // Pass the retrieved data to the view
        });
    });
}).catch(errorFn);

// Define your Express route handler

/* 
    seat_num
    date
    time
    isAvailable
*/



server.get('/student-home', function (req, resp) {
    console.log('Student home loaded!')
    resp.render('sHome', {
        layout: 'index',
        title: 'ILABS | Student Homepage',
        css: './css/landing.css'
    });
});

server.get('/bookReserve', function (req, resp) {
    resp.render('bookReserve', {
        layout: 'layoutReserve',
        title: 'ILabs | Book Reserve'
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

server.get('/viewMyReservations', function (req, resp) {
    resp.render('viewMyReservations', {
        layout: 'layoutReserve',
        title: 'ILabs | View My Reservations'
    });
});




const port = process.env.PORT | 9090;
server.listen(port, function () {
    console.log("Listening at port " + port);
});
