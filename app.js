'use strict';

var PORT = process.env.PORT || 3000;

var express=require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt = require('jwt-simple')
var app = express();

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/socialLogin');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true} ));
app.use(bodyParser.json());
app.use(express.static('public'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/users'));
app.use('/threads', require('./routes/threads'));
app.use('/coolpool', require('./routes/thecoolpool'));


// app.use(function  (req,res) {
//   res.status(404).render('404');
// });


app.listen(PORT, function(){
  console.log('Listening on port: ', PORT);
});
