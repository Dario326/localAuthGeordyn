/// YOU MUST REQUIRE MONGOOSE AND BCRYPTJS
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var User = Schema({ /// WHEN YOU MAKE A POST IN POSTMAN FOR A NEW USER, SET THE DATA UP AS:

	  	username: {type: String, required: true},
    	password: {type: String, required: true},
		age: {type: Number, required: true}

});


/////////// BCRYPT /////////////
User.methods.generateHash = function( password ) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.methods.validatePassword = function( password ) { // WHEN A USER LOGS IN, IT WILL COMPARE THE PASSWORD ENTERED, WITH THE HASHED PASSWORD THAT IS SAVED IN THE DATABASE
	return bcrypt.compareSync(password, this.password);
};


//////////// BEFORE A USER IS SAVED, IT HASHES THE PASSWORD //////////////
User.pre('save', function(next){
 var user = this;
 if(!user.isModified('password')) return next();
 user.password = User.methods.generateHash(user.password); // USES FUNC ABOVE

 next();
});

module.exports = mongoose.model('User', User);
