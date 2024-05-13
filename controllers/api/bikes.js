const Bike = require('../../models/bike');


module.exports = {
  create,
  getAll,

};

async function getAll(req, res) {
  const bikes =  await Bike.find({isSold:false}).populate('seller').exec();
  res.json(bikes);
}

async function create(req, res) {
  console.log(req.body);
  try {

    req.body.seller = req.user._id;
    const bike = await Bike.create(req.body);
    // eslint-disable-next-line no-undef
    res.json(bike);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}