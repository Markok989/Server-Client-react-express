const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create Loval Strategy
const localOptions = {
  usernameField: 'email'
};
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // verify this username and password, call done with user
  //if it is correct email and password
  //otherwise, call done with false
  User.findOne({
    email: email
  }, function(err, user) { // trazi da li vec ima korisnika sa tom mail adresom

    if (err) {
      return done(err);
    } // kada je nadjen korisnik sa tom adresom
    if (!user) {
      return done(null, false);
    } // kada korisnik nije nadjen

    //compare password - is 'password' equal to user.password?

    user.comparePassword(password, function(err, isMatch) {

        if(err) {return done(err); } // greska

        if(!isMatch) { // ako nije greska, nije nadjen korisnik sa istom adresom
          return done(null, false);
        }

        return done( null, user);

    });

  });
});

//Setup options for Jwt Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};


//Create JWT Strategy

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) { //done callback function
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object

  User.findById(payload.sub, function(err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) { // ako se nadje korisnik
      done(null, user);
    } else { // ako se ne nadje korisnik
      done(null, false);
    }

  });

}); //funkicaja koja se poziva kada treba da se Authentication korisnik



//Tell passport to use this Strategy
passport.use(jwtLogin);
passport.use(localLogin);
