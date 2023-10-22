const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const DogSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true,
    trim: true
  },
  treat: {
    type: String,
    required: true
  }
});

// Create the Dog model using the schema
mongoose.model('dogs', DogSchema);
