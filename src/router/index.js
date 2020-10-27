const express = require('express');
const router = express.Router();
const product = require('./product')
const getDetails = require('./getDetails')
const orderDetails = require('./orderDetails')
const notification = require('./notification')
const user = require('./user')


router.use(express.static('dist'));
router.use('/product', product);
router.use('/order', orderDetails)
router.use('/thesaurus', getDetails);
router.use('/user', user)
router.use('/notification',notification)


module.exports = router;