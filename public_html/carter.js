//var app = require('express')()
//  , server = require('http').createServer(app)
//  , io = require('socket.io').listen(server);

var express = require('express');
var app = express();
var server  = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(3000);

app.use(express.bodyParser());

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/devices.html');
});


app.get('/devices',function(req,res){
    
    console.log("initiating ....");
    
    io.sockets.emit('newdevices',{ deviceName: 'cRIO1234' }); 

    return res.send("triggered");
});

app.post('/devices',function(req,res){
    
    //console.log("New Device "+ req.body.deviceName+" posted ");
    
    console.log("body : "+req.body.device);
    io.sockets.emit('newdevice',{"device" : req.body.device}); 

    return res.send("Device broadcasted");
});




io.sockets.on('connection', function (socket) {
  console.log("initialising socketio ..");
  //socket.emit('news', { hello: 'world' });
  socket.on('from_client', function (data) {
    console.log("from client " + data);
    socket.broadcast.emit('changed' , data);
  });   
  
  
});