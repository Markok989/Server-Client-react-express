const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');


function tokenForUser(user) {
  const timestamp = new Date().getTime(); //kada je korisnik kreiran

//token payload, odnisi se na passport.js
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
  //kriptovanje sa secret stringom, sub=subject( o kom tokenu je rec)
}


exports.signin = function(req, res, next){
//User has alredy had their email and password auth'd
//We just need to give them a token
res.send({token: tokenForUser(req.user) });

}

exports.signup = function(req, res, next) {

  //console.log(req.body); provera da li radi post ruta

  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) { return res.status(422).send({ error: 'Morate uneti email i sifru ' });
  }

  //See if a user with the given email exists, everything in node req callback

  User.findOne({ email: email }, function(err, existingUser) {
    //vraca gresku, i da li postoji korisnik sa email.(Vec postoji korisnik sa tom adresom)

    if (err) {  return next(err); }

    //If a user with email does exists, return Error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' }); //vraca gresku 422
    }

    //If a user with email does NOT exist, create and save user record

    const user = new User({ //cuva podatke mail i sifru
      email: email,
      password: password
    });

    user.save(function(err) {

      if (err) { return next(err);
      }

      //Respound to reqvest inducatung the user was created

      res.json({ token: tokenForUser(user)
      });

    });


    //res.send({ success: 'true'});*/
  });
}



/*
    localhost:3090/signin

    kada se prijavi korisnik, dobija se token tog korisnika, u slucaju da se ukuca pogresna sifra izbacuje gresku
*/
