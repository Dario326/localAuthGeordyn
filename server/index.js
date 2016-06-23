////// DEPENDENCIES //////
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');


////// !!! CREATE A CONFIG FILE !!! ///////
var config = require('./config.js');
// IT WILL LOOK LIKE THIS:
// module.exports ={
// port: 4545,
// secret: 'usafsdfdasf-fdsaTYPE-RANDOM-STUFF53-5435345-5435345-hjfkhkaljs',
// mongoUri:  'mongodb://localhost:27017/authExample'
// }


var passport = require('./svcs/passport.js');
var userCtrl = require('./ctrls/userCtrl.js');


var app = express();
var port = config.port;

app.use(bodyParser.json());
app.use(express.static(__dirname + "/../public"));

app.use(session({
    secret: config.secret,
    resave: true,
    saveUninitialized: true
  }));
app.use(passport.initialize());
app.use(passport.session());


/// CONNECTS TO YOUR DATABASE ///
var mongoUri = config.mongoUri;
mongoose.connect(mongoUri);

mongoose.connection.once('open', function(){
  console.log('successfully connected to mongodb');
});


////////////// "ENDPOINTS" -OR- "MIDDLEWARE" ///////////////

// USER //
app.post('/api/user', userCtrl.addUser); // creates new user
app.get('/api/user/:id', userCtrl.getUser); // gets individual user
app.get('/api/getCurrentUser', userCtrl.getCurrentUser);
//current user , goes to user controller, res.send(req.user) sends back current user
    //call endpoint in resolve

// LOGIN //
app.post('/api/login', passport.authenticate( 'local-auth', {
  successRedirect: '/api/getCurrentUser' // when you login successfully, it runs the userCtrl.getCurrentUser function and sends back the current user
  }
));

// LOGOUT //
app.get('/api/logout', function(req, res, next) {
  req.logout();
  return res.status(200).send("logged out");
});





//// LISTENING ////
app.listen(port, function() {
  console.log('now listening at port ' + port);
});
