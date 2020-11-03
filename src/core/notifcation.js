const controller = require('./controller')
const { notifications } = require('../db/notification')

const notification = () => {
    return {


        async addMessage(req, res) {
            try {
                let data = req.body.data;
                if (!data.message) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": "Message is required"
                    }, 'credentials', 400));
                }
                await new notifications(data).save()
                return res.status(200).send(controller.successFormat({
                    "message": "Message have been successfully send it"
                }, 'service', 200));
            } catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message": err.message
                }, 'credentials', 400));
            }
        }
    }
}

module.exports = notification()