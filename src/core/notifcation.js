const controller = require('./controller')
const { notifications } = require('../db/notification')
const { user } = require('../db/user')
const { location } = require('../db/service')

const notification = () => {
    return {


        async addMessage(req, res) {
            try {
                let data = req.body.data;
                let checkUser = await user.findOne({ _id: req.params.user_id });
                if (!checkUser) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": `User doesn't exits`
                    }, 'credentials', 400));
                }
                if (!data.location) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": "Location is required"
                    }, 'credentials', 400));
                }
               
                let checkLocation = await location.findOne({ location: data.location });
                if(checkLocation){
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": `Location doesn't exits`
                    }, 'credentials', 400));
                }
                data.message = `${checkUser.name}(${checkUser.mobile_number}) make service on this ${data.location} location`;
                console.log(data.message)
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