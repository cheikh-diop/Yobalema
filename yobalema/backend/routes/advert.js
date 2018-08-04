
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Advert = require('../models/Advert.js');
var fs = require('fs');
var decode64 = require('base-64').decode;
var utility = require('../config/utility.js');

/* GET ALL ADVERTS */
router.get('/', function(req, res, next) {
  Advert.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


router.get('/searchField', function(req, res, next) {
  console.log(req.query.model);
  console.log(req.query.type);

  const regexModel = new RegExp(escapeRegex(req.query.model), 'gi');
  const regexType = new RegExp(escapeRegex(req.query.type), 'gi');
  const regexMarc = new RegExp(escapeRegex(req.query.mark), 'gi');
  const regexCity = new RegExp(escapeRegex(req.query.city), 'gi');
  const regexCountry = new RegExp(escapeRegex(req.query.country), 'gi');

// la j'ai fait rec c tous ce qu il y a nrml att
  Advert.find({$or:[{ "model": regexModel},{ "type":regexType},{ "mark":regexMarc},{ "country":regexCountry}, { "city":regexCity}]}, function (err, results) {
    if (err) {
        console.log(err);
    } else {
        res.json(results);
        console.log(results);
        console.log("TEST");
    }
});
});





router.get('/search', function(req, res, next) {
  

var keyword = req.query.search;

var find = {'$text':{'$search':keyword}};

Advert.find(find)
.exec(function(err, docs) { 
  
  if (err) return next(err);
 
  res.json(docs);
});


});

/* GET ADVERT  BY ID */
router.get('/:id', function(req, res, next) {
  Advert.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE ADVERT */
router.post('/createAdvert', function(req, res, next) {
  Advert.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});



/* SAVE ADVERT SOME COLOMNS */
router.post('/addAdvertLessUser',(req,res)=>{
console.log(utility.getDateTime())
var a =new Advert();
var img = req.body.url;
var data = img.replace(/^data:image\/\w+;base64,/, "");
var buf = new Buffer(data, 'base64');
fs.writeFile('src/assets/'+req.body.image_url, buf);

  a.title=req.body.title;
  a.description=req.body.description;
  a.type=req.body.type;
  a.mark=req.body.mark;
  a.model=req.body.model;
  a.current_date=utility.getDateTime();
  a.address.code_city=req.body.address.code_city;
  a.address.city=req.body.address.city;
  a.address.country=req.body.address.country;
  a.address.street=req.body.address.street;
  a.date_time=req.body.date_time;
  a.image_url=req.body.image_url;
  a.save(function(err){
      if (err){
          res.send(err);
         
      }
      res.send({message:"add created"});
  })


});



/* UPDATE ADVERT */
router.put('/:id', function(req, res, next) {
  Advert.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE ADVERT */
router.delete('/:id', function(req, res, next) {
  Advert.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* MATCH ADVERT */
router.post('/match', function(req, res, next) {
// ca passe il ma donner ce que je veux c est un "et"
  //console.log("contenue de body"+req.query.type);
  
  Advert.find({ $and: [ { type : "Trouve"}, { mark: req.body.mark }] }, function (err, doc){
    if (err) return next(err);
    
    res.json(doc);
    
});
    
}); 

module.exports = router;

