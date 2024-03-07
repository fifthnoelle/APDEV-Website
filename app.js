
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



server.get('/student-home', function(req, resp){
	console.log('Student home loaded!')
    resp.render('sHome',{
        layout: 'index',
        title: 'ILABS | Student Homepage',
        css: ''
    });
});


const port = process.env.PORT | 9090;
server.listen(port, function(){
	console.log("Listening at port " + port);
});
