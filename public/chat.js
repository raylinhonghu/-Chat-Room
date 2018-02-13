// Make connection

// front end
var socket = io.connect('http://localhost:4000');

// emitting message from client to the server

// Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

// emit event Send
if(btn){
  btn.addEventListener('click', function(){
    // 2 parameter: name of message & data
    socket.emit('chat',{
      message: message.value,
      handle: handle.value
    })
  })
}

// listen for events
socket.on('chat',function(data){
  feedback.innerHTML = '';
  var userIcon = document.createElement('img');
  userIcon.setAttribute("src", "src/3.png");
  userIcon.setAttribute("alt", "The Pulpit Rock");
  output.appendChild(userIcon);
  output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
})

if(message){
  message.addEventListener('keypress', function(){
    socket.emit('typing',handle.value)
  })
}

socket.on('typing',function(data){
  feedback.innerHTML = '<p><em>' + data + '正在输入... </em></p>';
})
