
const express = require('express');
const router = express.Router();
const user = require('../core/user')
const validation = require('../validation/user.validation')
const controller = require('../core/controller')

router.post('/verify-mobile-number/', async (req, res) => {
    try {
        user.verifyMobileNumber(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "order-details", 500));
    }
})

router.post('/login', async (req, res) => {
    try {
        let { error } = await validation.login(req.body.data)
        if (error) {
            return res.status(400).send(controller.errorFormat({
                "message": error.message
            }, "order-details", 400));
        }
        user.login(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "order-details", 500));
    }
});

router.post('/resend/otp', async (req, res) => {
    try {
        let { error } = await validation.login(req.body.data)
        if (error) {
            return res.status(400).send(controller.errorFormat({
                "message": error.message
            }, "order-details", 400));
        }
        user.resendOtp(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "order-details", 500));
    }
});

router.post('/verify/otp', async (req, res) => {
    try {
        let { error } = await validation.verifyOtp(req.body.data)
        if (error) {
            return res.status(400).send(controller.errorFormat({
                "message": error.message
            }, "order-details", 400));
        }
        user.verifyOtp(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "order-details", 500));
    }
});

router.delete('/logout', async (req, res) => {
    try {
        user.logout(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "order-details", 500));
    }
});

module.exports = router;