const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bikeSchema = require('./bikeSchema');

const lineBikeSchema = new Schema({
  qty: { type: Number, default: 1 },
  bike: bikeSchema
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

lineBikeSchema.virtual('extPrice').get(function() {
  // 'this' keyword is bound to the linebike document
  return this.qty * this.bike.price;
});

const buySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lineBikes: [lineBikeSchema],
  isPaid: { type: Boolean, default: false } 
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

buySchema.virtual('buyTotal').get(function() {
  return this.linebikes.reduce((total, bike) => total + bike.extPrice, 0);
});

buySchema.virtual('buyQty').get(function() {
  return this.linebikes.reduce((total, bike) => total + bike.qty, 0);
});

buySchema.virtual('buyId').get(function() {
  return this.id.slice(-6).toUpperCase();
});

buySchema.statics.getCart = function(userId) {
  return this.findOneAndUpdate(
    // query object
    { user: userId, isPaid: false },
    // update doc - provides values when inserting
    { user: userId },
    // upsert option
    { upsert: true, new: true }
  );
};

// Instance method for adding an bike to a cart (unpaid buy)
buySchema.methods.addbikeToCart = async function (bikeId) {
  // 'this' keyword is bound to the cart (buy doc)
  const cart = this;
  // Check if the bike already exists in the cart
  const linebike = cart.linebikes.find(linebike => linebike.bike._id.equals(bikeId));
  if (linebike) {
    // It already exists, so increase the qty
    linebike.qty += 1;
  } else {
    // Get the bike from the "catalog"
    // Note how the mongoose.model method behaves as a getter when passed one arg vs. two
    const Bike = mongoose.model('Bike');
    const bike = await Bike.findById(bikeId);
    // The qty of the new linebike object being pushed in defaults to 1
    cart.linebikes.push({ bike });
  }
  // return the save() method's promise
  return cart.save();
};

// Instance method to set an bike's qty in the cart
buySchema.methods.setbikeQty = function(bikeId, newQty) {
  // this keyword is bound to the cart (buy doc)
  const cart = this;
  // Find the line bike in the cart for the menu bike
  const lineBike = cart.lineBikes.find(lineBike => lineBike.bike._id.equals(bikeId));
  if (lineBike && newQty <= 0) {
    // Calling deleteOne, removes the lineBike suBdoc from the cart.lineBikes array
    lineBike.deleteOne();
  } else if (lineBike) {
    // Set the new qty - positive value is assured thanks to prev if
    linebike.qty = newQty;
  }
  // return the save() method's promise
  return cart.save();
};

module.exports = mongoose.model('Buy', buySchema);
