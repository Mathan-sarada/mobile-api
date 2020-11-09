const express = require('express');
const router = express.Router();
const controller = require('../core/controller')
const payment = require('../core/payment')

router.post('/verification', async (req, res) => {
    try {
        payment.verifyPayment(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "order-details", 500));
    }
});
module.exports = router;