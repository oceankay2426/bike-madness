const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BuySchema = new Schema({
   
  }, {
    timestamps: true
  });
  
  module.exports = mongoose.model('Buy', BuySchema);