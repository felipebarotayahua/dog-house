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


// Post a new dog
router.post('/', (req, res) => {
  console.log(req.body);

  // Extract dog data from the request body
  const { name, breed, age, gender, treat } = req.body;

  // Create a new Dog instance with the extracted data
  const newDog = new Dog({
    name,
    breed,
    age,
    gender,
    treat,
  });

  // Save the new dog to the database
  newDog
    .save()
    .then(() => {
      console.log('Document Saved');
      res.redirect('/'); // Redirect to the root route after saving
    })
    .catch((error) => {
      console.error(error);
      // Handle any errors here
      res.status(500).json({ error: 'Internal Server Error' });
    });
});
module.exports = router;
