'use strict'
const http = require('http')
const express = require( 'express' );
const app = express();
const server = http.createServer(app)
// const wss = new SocketServer({ server });
const socketIo = require('socket.io')

const io = require('socket.io').listen(server);
var session = require( 'express-session' );
const bodyParser = require( 'body-parser' );
const ejs = require( 'ejs' );
require('./controllers/userController')(app);
require('./views/tracker')(app);
require('./views/header/head')(app);
var morgan = require('morgan')
const path = require("path");
const locationMap = new Map()
const cookieParser = require('cookie-parser')

//use the morgan middleware to log each transaction
app.use(morgan('dev'));

app.use( cookieParser() );

// direct requests to the public directory
app.use( express.static( __dirname + '/public' ) );
// set up template
app.set( 'view engine', 'ejs' );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {
  extended: false
} ) );

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session( {
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: true,
  saveUninitialized: true,
  cookie: {
    expires: 60000
  }
} ) );

app.get('/', (req, res) => {
    console.log('HERE IS THE COOKIE!', req.cookies)
    // console.log('session check!', req.session)

    res.render('index');
})

app.get('/tracker', (req, res) => {
    console.log('here is the tracker')
    // console.log('session check!', req.session)

    res.render('tracker');
})

app.get('/viewer', (req, res) => {
    console.log('this is viewer!')
    // console.log('session check!', req.session)

    res.render('viewer');
})



io.on('connection', socket => {
	socket.on('registerTracker', () => {
		locationMap.set(socket.id, {lat: null, lng: null})
	})

	socket.on('updateLocation', pos => {
		if(locationMap.has(socket.id)) {
			locationMap.set(socket.id, pos)
			console.log(socket.id, pos)
		}
		// locationMap.set(socket.id)
	})

	socket.on('requestLocations', () => {
		socket.emit('locationsUpdate', Array.from(locationMap))
	})

	socket.on('disconnect', () => {
		locationMap.delete(socket.id)
	})
})

var port = process.env.PORT || 3002


// listen to port
server.listen(port) 
console.log('session and cookies is listening on port: ' + port);;


module.exports = app;

	