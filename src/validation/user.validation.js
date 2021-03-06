const Joi = require('joi');
class validation {

    async login(req) {
        let schema = Joi.object().keys({
            mobile_number: Joi.string().required(),
            email:Joi.string().required().email(),
            name:Joi.string().required()
        });

        return schema.validate(req, { abortEarly: false });
    }

    async verifyOtp(req) {
        let schema = Joi.object().keys({
            mobile_number: Joi.string().required(),
            otp: Joi.string().required()
        });

        return schema.validate(req, { abortEarly: false });
    }

}

module.exports = new validation;