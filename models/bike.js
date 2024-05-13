const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bikeSchema = new Schema({
    name: {
        type: String,
        required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  categories: {
    type: String,
    required: true,
    enum: ['Aprilla','BMW','Ducati','Harley-Davidson','Honda','Kawasaki','Suzuki','Triumph','Yamaha']
},
isSold: { type: Boolean, default: false }
});

module.exports = mongoose.model('Bike', bikeSchema);
