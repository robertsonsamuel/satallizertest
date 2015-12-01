'use strict';

var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;


var Message;

var messageSchema = Schema({
 userThread:{type:Array},
 messagesThread: Array
});


Message = mongoose.model('Message', messageSchema);

module.exports = Message;
