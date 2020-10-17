const express = require('express');
const router = express.Router();
const controller = require('../core/controller')
const validation = require('../validation/details.validation');
const orderDetail = require('../core/orderDetails')

router.post('/add-order-details/:product_id', async (req, res) => {
    try {
        let { error } = await validation.orderDetails(req.body.data)
        if (error) {
            return res.status(400).send(controller.errorFormat({
                "message:": error.message
            }, "order-details", 400));
        }
        orderDetail.addOrderDetails(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message:": err.message
        }, "order-details", 500));
    }
});

module.exports = router;