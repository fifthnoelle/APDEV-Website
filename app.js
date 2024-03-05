const express = require('express');
const server = express();

const bodyParser = require('body-parser')
server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));

const handlebars = require('express-handlebars');
server.set('view engine', 'hbs');
server.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

server.use(express.static('public'));


server.get('/', function(req, resp){
    resp.render('bookReserve',{
        layout: 'layoutReserve',
        title: 'ILabs | Book Reserve'
    });
});

server.get('/indexStudent', function(req, resp){
    resp.render('indexStudent',{
        layout: 'layoutReserve',
        title: 'ILabs | Student HOME'
    });
});

const port = process.env.PORT | 9090;
server.listen(port, function(){
    console.log('Listening at port '+port);
});