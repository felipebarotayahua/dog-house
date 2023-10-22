const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('models/Dog');
const Dog = mongoose.model('dogs');

// Test the page
router.get('/', (req,res) => {
  res.send('Hello')
});

// Get all dogs
router.get('/dogs', async (req,res) => {
  const filter ={};
  const dogs = await Dog.find(filter);
  res.json(dogs);
});

// Get a specific number of dogs (e.g., 50)
router.get('/dogs/50', async (req, res) => {
  const numberOfDogs = 50;
  const limitedDogs = await Dog.find().limit(numberOfDogs);
  res.json(limitedDogs);
});

// Get all dogs with a specific name (case-sensitive)  type in the name in /dogs/(name) to search
router.get('/dogs/:name', async (req, res) => {
  const name = req.params.name;
  try {
    const dogsWithSpecificName = await Dog.find({ name: name });
    res.json(dogsWithSpecificName);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching dogs' });
  }
});


//Show all breeds
router.get('/breeds', async (req,res)=> {
  const breeds = await Dog.distinct('breed');
  res.json(breeds);
});

//Show all treats
router.get('/treats', async (req,res)=> {
  const treats = await Dog.distinct('treat');
  res.json(treats);
});

// Get all dogs of a specific age
router.get('/dogs/age/:age', async (req, res) => {
  const requestedAge = req.params.age;
  try {
    const dogsWithSpecificAge = await Dog.find({ age: requestedAge });
    res.json(dogsWithSpecificAge);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching dogs' });
  }
});


// LESS THAN "age"
router.get('/dogs/age/:age/lt', async (req, res) => {
  const requestedAge = req.params.age;

  try {
    const dogsYoungerOrEqual = await Dog.find({ age: { $lte: requestedAge } });
    res.json(dogsYoungerOrEqual);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching dogs' });
  }
});
// GREATER THAN "age"
router.get('/dogs/age/:age/gt', async (req, res) => {
  const requestedAge = req.params.age;

  try {
    const dogsOlderOrEqual = await Dog.find({ age: { $gte: requestedAge } });
    res.json(dogsOlderOrEqual);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching dogs' });
  }
});

// Get all dogs of a Specific Breed
router.get('/breeds/:breed', async (req, res) => {
  const breed = req.params.breed;
  try {
    const dogsWithSpecificBreed = await Dog.find({ breed: breed });
    res.json(dogsWithSpecificBreed);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching dogs' });
  }
});

// Get all dogs who like a specific treat
router.get('/treats/:treat', async (req, res) => {
  const treat = req.params.treat;
  try {
    const dogsWithSpecificTreat = await Dog.find({ treat: treat });
    res.json(dogsWithSpecificTreat);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching dogs' });
  }
});









module.exports = router;