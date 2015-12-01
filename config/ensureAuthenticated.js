'use strict';
var jwt = require('jwt-simple');
var moment = require('moment');


function ensureAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    console.log(req.headers);
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.headers.authorization.split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, 'jwtsecret');
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  req.user = payload.sub;
  next();
}

module.exports = ensureAuthenticated