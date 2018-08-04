
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt  = require("passport-jwt").ExtractJwt;
const User =require("../models/Users")

module.exports = function(passport){
  
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = 'secret';
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log("the content "+jwt_payload);
    User.getUserById(jwt_payload.data._id, (err, user) => {
      
      if(err){
        console.log("erreur");
        return done(err, false);
      }

      if(user){
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
}