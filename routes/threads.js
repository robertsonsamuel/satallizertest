'use strict';

var express = require('express');
var router = express.Router();
var ensureAuthenticated = require('../config/ensureAuthenticated');
var User = require('../models/user');
var Message = require('../models/messageSchema')
var jwt  = require('jwt-simple');

router.post('/newThread' , function  (req, res) {
  var clickedUser = req.body.clickedUser;
  var currentUser = jwt.decode(req.body.currentUser, 'jwtsecret');
  var userArry = [];
  var userObj = {};
  userArry.push(clickedUser._id);
  userArry.push(currentUser.sub);
  console.log(userArry);
  userObj.userThread = userArry


  Message.findOne(currentUser,function  (err,conversation) {
    if(err) return console.error(err);
    console.log(conversation);
    if(conversation){
      res.send(conversation);
    }else{
      var message = new Message(userObj)
      message.save(function  (err, savedCon) {
       if (err) return console.error(err);
       res.send(savedCon);
     });
      
    }

  });
  

});


module.exports = router;