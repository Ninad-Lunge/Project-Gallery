const mongoose = require('mongoose');

const TechnologySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    description: {
      type: String,
    },
});
  
module.exports = mongoose.model('Technology', TechnologySchema);  