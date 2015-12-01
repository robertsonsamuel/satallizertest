'use strict';

var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var moment = require('moment');

var Schema = mongoose.Schema;


var User;

var userSchema = Schema({
  // email: { type: String, unique: true, lowercase: true },
  // password: { type: String, select: false },
  displayName: String,
  picture: String,
  github: String,
  google: String,
  twitter: String,
  facebook: String
});

userSchema.methods.createJWT = function () {
  var payload = {
    sub: this._id,
    iat: moment().unix(),
    exp: moment().add(1, 'days').unix()
  };
  return jwt.encode(payload, 'jwtsecret');
};



User = mongoose.model('User', userSchema);

module.exports = User;
