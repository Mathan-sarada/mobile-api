const express = require('express');
const router = express.Router();
const notification = require('../core/notifcation')


router.post('/', async (req, res) => {
    try {
        notification.addMessage(req, res)
    }
    catch (err) {
        return res.status(500).send(controller.errorMsgFormat({
            "message": err.message
        }, "register", 500));
    }
});

module.exports = router;