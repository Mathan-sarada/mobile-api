const express = require('express');
const router = express.Router();
const controller = require('../core/controller')
const getDetails = require('../core/getDetails')

router.get('/category', async (req, res) => {
    try {
        getDetails.category(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "order-details", 500));
    }
});
router.get('/service', async (req, res) => {
    try {
        getDetails.services(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "order-details", 500));
    }
});
router.get('/vehicle', async (req, res) => {
    try {
        getDetails.vehicle(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "order-details", 500));
    }
});

router.get('/description/:vehicle_id', async (req, res) => {
    try {
        getDetails.descripton(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "order-details", 500));
    }
});
module.exports = router;