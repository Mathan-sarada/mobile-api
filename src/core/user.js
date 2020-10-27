const controller = require('./controller')
const { user } = require('../db/user')
const accountSid = 'AC52e7294da41ece238d49399ca869f095';
const authToken = 'af53e68e1e0038b9130a5c9ad7491e4e';
const client = require('twilio')(accountSid, authToken);


const users = () => {
    return {

        async login(req, res) {
            try {
                let data = req.body.data;
                const rand = Math.random() * (999999 - 100000) + 100000;
                let message = await client.messages
                    .create({
                        body: `One time password : ${Math.floor(rand)}`,
                        from: '+1 408 703 5694',
                        to: `+91${data.mobile_number}`
                    })
                let check = await user.findOne({ mobile_number: data.mobile_number });
                if (check) {
                    check.otp = `${Math.floor(rand)}`
                    check.message_sid = message.sid
                    isActive = false
                    check.save()
                    return res.status(200).send(controller.successFormat({
                        'message': "An OTP has been sent to your mobile number."
                    }, user))
                }
                let payload = {
                    mobile_number: data.mobile_number,
                    otp: `${Math.floor(rand)}`,
                    message_sid: message.sid
                }
                let dataDb = await new user(payload).save()
                return res.status(200).send(controller.successFormat({
                    'message': "An OTP has been sent to your mobile number.",
                    "user_id": dataDb._id
                }, user))
            }
            catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message": err.message
                }, 'service', 400));
            }
        },

        async resendOtp(req, res) {
            try {
                let data = req.body.data;
                let checkMobileNumber = await user.findOne({ mobile_number: data.mobile_number });
                if (!checkMobileNumber) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": "Mobile Number doesn't exits, Please Login"
                    }, 'service', 400));
                }
                if (checkMobileNumber.isActive) {
                    const rand = Math.random() * (999999 - 100000) + 100000;
                    let message = await client.messages
                        .create({
                            body: `One time password : ${Math.floor(rand)}`,
                            from: '+1 408 703 5694',
                            to: `+91${data.mobile_number}`
                        })
                    await user.findOneAndUpdate({ mobile_number: data.mobile_number }, { otp: `${Math.floor(rand)}`, isActive: false, message_sid: message.sid })
                    return res.status(200).send(controller.successFormat({
                        'message': "An OTP has been sent to your mobile number."
                    }, user))
                }
                let message = await client.messages
                    .create({
                        body: `One time password : ${checkMobileNumber.otp}`,
                        from: '+1 408 703 5694',
                        to: `+91${data.mobile_number}`
                    })
                await user.findOneAndUpdate({ mobile_number: data.mobile_number }, { message_sid: message.sid })
                return res.status(200).send(controller.successFormat({
                    'message': "An OTP has been sent to your mobile number."
                }, user))
            }
            catch (error) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message": error.message
                }, 'service', 400));
            }

        },
        async verifyOtp(req, res) {
            try {
                let data = req.body.data;
                let checkMobileNumber = await user.findOne({ mobile_number: data.mobile_number });
                if (!checkMobileNumber) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": "Mobile Number doesn't exits, Please Login"
                    }, 'service', 400));
                }
                if (checkMobileNumber.otp == data.otp) {
                    return res.status(200).send(controller.successFormat({
                        'message': "Login Successfully"
                    }, user))
                }
                return res.status(400).send(controller.errorMsgFormat({
                    "message": "Otp is wrong "
                }, 'service', 400));
            } catch (error) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message": error.message
                }, 'service', 400));
            }

        },

        async logout(req, res) {
            try {
                if (!req.query.mobile_number) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": "Mobile Number is required"
                    }, 'service', 400));
                }
                let check = await user.findOne({ mobile_number: req.query.mobile_number })
                if (!check) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": "Mobile Number doesn't exits, Please Login"
                    }, 'service', 400));
                }
                await user.deleteOne({ mobile_number: req.query.mobile_number })
                return res.status(200).send(controller.successFormat({
                    'message': "Logout Successfully"
                }, user))
            } catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message": err.message
                }, 'service', 400));
            }
        }



    }
}

module.exports = users()