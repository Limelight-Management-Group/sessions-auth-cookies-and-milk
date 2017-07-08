const express = require( 'express' );
const app = express();
var session = require( 'express-session' );
const bodyParser = require( 'body-parser' );
const ejs = require( 'ejs' );
require('./controllers/userController')(app);
var morgan = require('morgan')
const path = require("path");

var cookieParser = require('cookie-parser')

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

var port = process.env.PORT || 3002


// listen to port
app.listen(port, function() {
console.log('session and cookies is listening on port: ' + port);
});

	