const Joi = require('joi');
class validation {

    async productValidation(req) {
        let schema = Joi.object().keys({
            services: Joi.array().items(Joi.string()),
            location: Joi.string().required(),
            mobile_number: Joi.string().required(),
            vehicle_no: Joi.string().required(),
            vehicle_owner_name: Joi.string().required(),
            address: Joi.string().required()
        });

        return schema.validate(req, { abortEarly: false });
    }

    async addCartForBikeService(req) {
        let schema = Joi.object().keys({
            service_details: Joi.object().keys({
                vehicle_cc: Joi.string(),
                model_year: Joi.string().required(),
                vehicle_owner_name: Joi.string().required(),
                vehicle_no: Joi.string().required()
            }).required(),
            brand: Joi.string().required(),
            location: Joi.string().required(),
            mobile_number: Joi.string().required(),
            address: Joi.string().required(),
            service_id: Joi.string().required()
        });

        return schema.validate(req, { abortEarly: false });
    }
    async addCartForBatteryService(req) {
        let schema = Joi.object().keys({
            brand: Joi.string().required(),
            location: Joi.string().required(),
            mobile_number: Joi.string().required(),
            address: Joi.string().required(),
            service_id: Joi.string().required()
        });

        return schema.validate(req, { abortEarly: false });
    }

}

module.exports = new validation;