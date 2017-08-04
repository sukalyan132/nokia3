var express = require("express");
var app     = require('express')();
var server  = require('http').Server(app);
var io      = require('socket.io')(server);
path  = require('path');
var config  = require('./config');
var localport=3000;
var WebSocket = require('ws');

var port =config.port;
var hostname =config.hostname;
var WebSocket = require('ws');
var host = 'http://192.168.20.117:9090';

server.listen(localport,function() {
  console.log('Server running on port: %d', localport);
});


app.use(express.static(path.join(__dirname, 'public')));

/* 
io.on('connection', function (socket) {
 console.log('connection');
  var ws = new WebSocket(host);
  ws.on('open', function(){
    console.log('WebSocket connected');
  });
  ws.on('message', function(msg) {
    console.log('got WS: ' + msg);
    var data = {};
    try {
      data = JSON.parse(msg.toString());
      if (data.tp) {
        console.log('sending TP');
        socket.emit('throughput', {"tp": data.tp});
      } else if (data.freq) {
        console.log('sending freq');
        socket.emit('OnActivateCbrs', {"freq": data.freq});
      }
    } catch (err) {
        console.error('cannot parse JSON ' + msg);
    }
});
  });
  */
 
//app.use(express.static(path.join(__dirname, 'public')));
// start socate
io.on('connection', function (socket) {
  socket.emit('throughput', {"tp": [400, 300],'fddCarrier':[2125,2145]});
  socket.on('activateCbrs', function (data) {
                                                console.log(data);
                                                if(!data.status.sas)
                                                {
                                                  if(data.status.radar==true)
                                                  {
                                                   socket.emit('OnActivateRadarCbrs', {"freq": {"sas": 40,"cbrs1": 3650,"cbrs2": 3670,"fdd1": 2125,
"fdd2": 2145}});
                                                  }
                                                }
                                                else
                                                {
                                                  socket.emit('OnActivateCbrs', {"freq": {"sas": 40,"cbrs1": 3610,"cbrs2": 3630,"fdd1": 2125,
"fdd2": 2145}});
                                                }
                                                
                                              });
socket.on('resetRequest', function (data) { console.log(data); });
socket.on('requestForModeChange', function (data) { console.log(data); });
});
