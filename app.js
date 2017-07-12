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
const queries = require('./database/db.js')
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

app.use((req, res, next) => {
    
    if (req.cookies.user_sid && req.session) {
        console.log('id check')
        next();        
    } else {
    console.log('id else condition')
    next();
    }
});


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

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.cookies.user_sid) {
        console.log(req.cookies.user_sid)
        res.render('profile');
    } else {
        next();
    }    
};

app.get('/', (req, res) => {
    console.log('HERE IS THE COOKIE!', req.cookies)
    console.log('session check!', req.session)

    res.render('index');
})

app.get('/profile', (req, res) => {
    console.log('here is the profile')
    console.log('session check!', req.session)

    res.render('profile');
})


app.route('/sign_up')
    .get(sessionChecker, (req, res) => {

    console.log('checking in from mentee home!')
    res.render('sign_up');
})
.post((req, res) => {
    queries.create({
    	username: req.body.username,
        password: req.body.password,
        f_name: req.body.f_name,
        l_name: req.body.l_name,
        email: req.body.email,
        location: req.body.location,
        age: req.body.age
    })
.then(user => {
    req.session.user = user.dataValues;
    res.redirect('/login', {user: user});
})
.catch(error => {
    console.log(error)
    res.redirect('/')
})
})

// route for user Login
app.get('/login', (req, res) => {
    // console.log('this is the session Checker', sessionChecker)
        res.render(__dirname + '/views/login.ejs');
});
app.post('/login', (req, res) => {
        console.log('sent the post')
        // console.log(mentee)
       //  console.log('username', mentee.username)
       console.log('this is req.body from login: ', req.body)
       // console.log('this is the req.body: ', req.body)
       var username = req.body.login_username;
       var password = req.body.login_password;
       queries.getOneuser(username, password)
        .then(user => {
             // console.log('this si the user: ', user)
             
                // console.log(mentee.menteename)
            if (( user.username === username && user.password === password)){
                // document.cookie = `username = ${user.username}`
                console.log("yo! You're logged-in!!!!")
                console.log('this is the user object', req.session)
                var image = user.image
                req.session.user_id = user.id;
                // if(req.files){
                //     // console.log('these is the req.files', req.files)
                // }
                // fs.writeFile('public/images/kanye-west-fan.jpg', image, 'binary', function(err){
                //     if (err) throw err
                //     console.log('File saved.')
                    res.redirect('/profile');
                // })
            } else {
                console.log('I did not login!!!')
                // req.session.mentee = user.dataValues;
                res.render('/');
            }
            
        }).catch(console.log)
    });


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

	