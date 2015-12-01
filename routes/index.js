'use strict';

var express = require('express');
var router = express.Router();
var ensureAuthenticated = require('../config/ensureAuthenticated');
var User = require('../models/user');

router.get('/', function(req, res) {
  res.render('../views/index', { title: 'ejs' });
});

router.get('/chatroom', ensureAuthenticated ,function  (req, res) {
  var userArr = [];
  User.find({}, function(err, user){
    res.send(user)
  });
});



module.exports = router;