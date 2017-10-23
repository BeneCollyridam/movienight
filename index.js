let express = require('express');
let app = express();
let http = require('http').Server(app);
let io  = require('socket.io')(http);
const PORT = 3000;

app.use(express.static('public'));

let rooms = [];

io.on('connection', (socket) => {
	socket.on('new source', function newSoruce(data){
		socket.broadcast.emit('new url', data);
	})

	socket.on('pause', function pause(){
		io.emit('pause');
	})

	socket.on('play', function play(){
		io.emit('play');
	})

	socket.on('sync', function sync(data){
		socket.broadcast.emit('sync', data);
	})
})

http.listen(PORT, function(){
	console.log(`Listening on ${PORT}`);
})