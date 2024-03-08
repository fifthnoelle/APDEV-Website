
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

const seatModel = mongoose.model('seat', seatSchema);

const searchQuery = {};

 function checkAvailability(date, timeslot, seat) {
    // 1.) iterate through reservations database under same date and timeslot
    // 2.) if same seat id then return reserved/unavailable
    // learn more about queries for mongoDB
} 

// Execute the find operation
seatModel.find(searchQuery).lean().then(function (seat_data) {
    seat_data.forEach(function(seat) {
        
        seat.availability = checkAvailability(date, time, seat);
    });
    console.log(seat_data);
}).catch(errorFn);

// Define your Express route handler
server.get('/', function (req, resp) {
    resp.render('bookReserve', {
        layout: 'layoutReserve',
        title: 'Serverr',
        'seat-data': seat_data, // Pass the retrieved data to the view
    });
});


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
