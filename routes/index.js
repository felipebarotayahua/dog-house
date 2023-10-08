var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
require('models/Dog');

const Dog = mongoose.model('dogs');


// get home page
router.get('/', async function(req, res, next) {
  const filter ={};
  const dogs = await Dog.find(filter);
  console.log('Dogs from database:', dogs);
  res.render('index', { title: 'Dog House', dogs: dogs });
});

module.exports = router;
