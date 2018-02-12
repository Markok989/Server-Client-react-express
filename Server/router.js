const Authentication = require('./contollers/authentication');
const passportSevice = require('./services/passport');
const passport = require('passport');


//middlleware, dont create session
const requireAuth = passport.authenticate('jwt', {
  session: false
});

const requireSignin = passport.authenticate('local', { session: false });


module.exports = function (app) {
  app.get('/', requireAuth, function (req, res) { //prvo ide na '/' => (salje na) requireAuth zatom radi funkciju
    res.send({
      message: 'Super secret code is ABC123'
      /*u programu Postman , u podesavnjima se stavi get opcija, zatim se unese korisnik sa novim mailom.
        Rezultat toga stvorice se token vezan za tog novog korisnika. Token se kopira u polje Headers.
        Ako je ispravan token korisnik ovlascen. A ako se token razlikuje od orignalnog tokena, korisnik nema pristup
      */
    });
  });
  app.post('/signin', requireSignin, Authentication.signin); //prvo se ovlascuje korisnik, zatim ide route hendler
  app.post('/signup', Authentication.signup); // post request

}



/*TEST
app.get('/', function(req, res, next) { req - reqvest , res - response, next( Error handler)

        res.send(['flasa', 'telefon', 'papir']);
          });
*/
