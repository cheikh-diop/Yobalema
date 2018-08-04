
var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



var UserSchema = new mongoose.Schema({
  last_name: String,
  name: String,
  email: String,
  password: String,
  phone_number: String,
  advert: [],
  address: {
    street: String,
    city: String,
    code_city: Number,
    country: String
  }
});


const User = module.exports = mongoose.model('user', UserSchema);



module.exports.getUserAdvert = function (id, callback) {


  User.findById(id,'advert',callback);  

  

}

module.exports.addUserAdvert = function (id,ad, callback) {


  User.findByIdAndUpdate(id,{ "$push" : { "advert" : ad } }, { 'new': true}, function (err,user){
      if (err)
      return "erreur de la requete"+ErrorHandler(err);

      

  });
  

}


module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
}

module.exports.getUserByEmail = function (email, callback) {
  const query = { email: email }
  User.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
}