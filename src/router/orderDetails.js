const express = require('express');
const router = express.Router();
const controller = require('../core/controller')
const validation = require('../validation/details.validation');
const orderDetail = require('../core/orderDetails')

router.post('/add-carts/:user_id', async (req, res) => {
    try {
        orderDetail.addCarts(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "order-details", 500));
    }
});


router.get('/show-carts/:user_id', async (req, res) => {
    try {
        orderDetail.getCarts(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "order-details", 500));
    }
});

router.delete('/remove-carts/:user_id', async (req, res) => {
    try {
       
        orderDetail.deleteCarts(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "order-details", 500));
    }
});

router.post('/check-out/:user_id', async (req, res) => {
    try {
       
        orderDetail.checkOut(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "order-details", 500));
    }
});

module.exports = router;