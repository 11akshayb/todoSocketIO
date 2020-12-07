var express = require('express');
var app = require('express')();
var http = require('http')
var server = http.createServer(app); 
var io = require('socket.io')(server); 

var todolist = []; 
var index;            

app.use(express.static('public')) //JS file

app.get('/todolist', function(req, res)
{
    res.sendFile(__dirname + '/index.html');
})

// Redirects to todolist homepage if wrong page is called
.use(function(req, res, next)
{
    res.redirect('/todolist');
});

io.sockets.on('connection', (socket) =>
{
    // console.log('a user connected');
    socket.emit('updateTask', todolist); //When user gets connected  
    socket.on('addTask', function(task)
    {
       todolist.push(task);      
       index = todolist.length -1;
       
       // console.log(task);
        
       socket.broadcast.emit('addTask', {task:task, index:index});
       // console.log(todolist);
    });
    
    socket.on('deleteTask', function(index)
    {
        todolist.splice(index, 1);        
        io.sockets.emit('updateTask', todolist);
    });
});

server.listen(8080, () => {
  console.log('listening on *:8080');
});