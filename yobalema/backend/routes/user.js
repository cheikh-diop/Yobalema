var async = require("async");
var express = require('express');
var router = express.Router();
const passport = require('passport');
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/Users.js');
var Advert = require('../models/Advert.js');
var fs = require('fs');
var decode64 = require('base-64').decode;
var utility = require('../config/utility.js');

/* GET ALL User */
router.get('/', function (req, res, next) {
  User.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});


/* SAVE USER USING BCRYPT TO CRYPT PASSWORD*/
router.post('/register', function (req, res, next) {
  let newUser = new User({
    name: req.body.name,
    last_name: req.body.last_name,
    phone_number: req.body.phone_number,
    email: req.body.email,
    password: req.body.password,
    address: {
      city: req.body.address.city,
      city_code: req.body.address.city_code,
      street: req.body.address.street,
      country: req.body.address.country
    }
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to register user' });
    } else {
      res.json({ success: true, msg: 'User registered' });
    }
  });
});


// Authenticate
router.post('/authenticate', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.getUserByEmail(email, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: 'Utilisateur non trouve' });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({ data: user }, "secret", {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email
          }
        });
      } else {
        return res.json({ success: false, msg: 'Mot de passe non valide' });
      }
    });
  });
});
/* UPDATE User (add avert ) */
router.put('/addUserAdvert', function (req, res, next) {

  async.waterfall([
    //creation dans la table advert
    function (callback) {
      var img = req.body.advert.url;
      var data = img.replace(/^data:image\/\w+;base64,/, "");
      var buf = new Buffer(data, 'base64');
      fs.writeFile('src/assets/' + req.body.advert.image_url, buf);
      let ad = new Advert();
      ad = req.body.advert;
      ad.current_date = utility.getDateTime();

      Advert.create(ad, callback)
    },  // creation dans la table user
    function (advert, callback) {
      User.addUserAdvert(req.body._id, advert, callback)
    }
  ], function (error, success) {
    if (error) res.json({ success: false, msg: 'probleme ajout' });

    return res.json(success);
  });

});

/* DELETE User adver */
router.put('/deleteUserAdvert', function (req, res, next) {
  console.log("clique sur delete advert");
  console.log("Id de l'utilisateur " + req.body._id + " Id des annonces " + req.body.idadvert);

  async.waterfall([
    //creation dans la table advert

    function (callback) {
      Advert.where('_id').equals(req.body.idadvert).remove(callback)

    },
    function (res, callback) {

      User.update({ _id: req.body._id }, { $pull: { advert: { _id: new mongoose.mongo.ObjectID(req.body.idadvert) } } }, callback)

    }
  ], function (error, success) {
    if (error) res.json({ success: false, msg: 'probleme ajout' });

    return res.json(success);
  });


});

/* Update user advert */
router.put('/updateUserAdvert', function (req, res, next) {
  console.log("clique sur delete advert");
  console.log(" Advert " + JSON.stringify(req.body));

  async.waterfall([
    //creation dans la table advert

    function (callback) {
      Advert.update({ _id: req.body._id }, {
        $set:
          {
            title: req.body.title,
            mark: req.body.mark,
            model: req.body.model,
            description: req.body.description


          }
      }, callback)

    },
    function (res, callback) {

      User.update({
        _id : new mongoose.mongo.ObjectID(req.body.userid),
        "advert._id" : new mongoose.mongo.ObjectID(req.body._id)
      },
        {
          $set:
            {

              "advert.$.title" : req.body.title,
              "advert.$.mark" : req.body.mark,
              "advert.$.model" : req.body.model,
              "advert.$.description" : req.body.description
            
            }

        }, callback);

    }
  ], function (error, success) {
    if (error) res.json({ success: false, msg: 'probleme ajout' });

    
    return res.json(success);
  });


});
// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {

  res.json({ user: req.user });

});

router.get('/getUserAdvert/:id', (req, res, next) => {


  User.getUserAdvert(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post)
  });


});

module.exports = router;