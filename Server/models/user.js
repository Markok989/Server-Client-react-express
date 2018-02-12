const mongoose = require('mongoose');
const Schema = mongoose.Schema; //deo mongoose
const bcrypt = require('bcrypt-nodejs'); //enkripcija sifri

// Define our model

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  }, //proverava email ( da li je jedinstven), i gledaju se mala slova
  password: String
});

// On save Hook, encrypt password
//Before saving a model , run this function
userSchema.pre('save', function (next) {
  //get accses to the user model
  const user = this; //accses to user model

  //generate a salt, than run callback
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    //hash(encrypt) our password usnig the salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }

      //owerwrite plan text password with encrypted password
      user.password = hash;
      next(); // go and save the model
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    //this.password se odnosi na user model password

    if (err) { return callback(err); } // ako ima greske tokom poredjenja vrati error

    callback(null, isMatch);
  });
}


// Create the model class

const ModelClass = mongoose.model('user', userSchema); // kala korisnika

//Export the model
module.exports = ModelClass;
