'use strict';

var express = require('express');
var ensureAuthenticated = require('../config/ensureAuthenticated');
var User = require('../models/user');
var router = express.Router();




router.get('/me', ensureAuthenticated, function(req, res) {
  User.findById(req.user, function(err, user){
    res.send({
      displayName: user.displayName,
      picture: user.picture
    });
  })
});

module.exports = router;