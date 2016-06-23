var User = require('../models/user.js');

module.exports = {

  addUser: function(req, res) { // SAVES NEW USER INFO TO DATABASE
    new User(req.body).save(function(err, user) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(user);
      }
    });
  },


  getCurrentUser: function(req, res) { // GETS CURRENT USER AFTER LOGIN AND SENDS IT TO THE FRONTEND
    if (req.user) {
      res.status(200).send(req.user);
    } else {
      res.status(403).send('forbidden');
    }
  },


  getUser: function(req, res) { // GETS AN INDIVUDAL USER. YOU WONT REALLY NEED THIS UNLESS YOURE DELETING FROM POSTMAN BUT HERE IT IS.
    User.findById(req.query.id, function(err, user) {
      if (err) {
        return console.error(err);
      } else {
        res.send(user);
      }
    });
  },

  logout: function(req, res) { // OBVI LOGS OUT
    req.logout();
    // res.redirect('/');
  }

};
