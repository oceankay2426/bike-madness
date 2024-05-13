const express = require('express');
const router = express.Router();
const bikesCtrl = require('../../controllers/api/bikes');
const ensureLoggedIn = require('../../config/ensureLoggedIn');


router.post('/orders/buy', ensureLoggedIn, bikesCtrl.create);
router.get('/orders/buy', bikesCtrl.getAll);



module.exports = router;