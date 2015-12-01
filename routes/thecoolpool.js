//where the cool kids talk 
// yep it 1am 

'use strict';

var express = require('express');
var router = express.Router();
var ensureAuthenticated = require('../config/ensureAuthenticated');
var User = require('../models/user');
var Message = require('../models/messageSchema');
var jwt = require('jwt-simple');


router.post('/',function  (req, res) {
  var currentUser = jwt.decode(req.body.currentUser, 'jwtsecret');
  console.log(currentUser)
  Message.findOne(currentUser.sub, function  (err, conversation) {
    if(err) return console.error(err);
    res.send(conversation);
  })
});


module.exports = router;