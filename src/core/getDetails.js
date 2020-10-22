const controller = require('./controller')
const { category, service, description } = require('../db/service')
const { vehicles } = require('../db/vehicle')

const getDetails = () => {
    return {

        async category(req, res) {
            try {
                if (req.query.category_name) {
                    req.query.category_name = req.query.category_name.toLowerCase()
                    let getAllCategory = await category.find({ category_name: { $regex: new RegExp(req.query.category_name) }, status: true })
                    if (getAllCategory.length > 0) {
                        return res.status(200).send(controller.successFormat({
                            "data": getAllCategory
                        }, "service", 200));
                    }
                    return res.status(200).send(controller.successFormat({
                        "data": []
                    }, "service", 200));
                }
                let getAllCategory = await category.find({})
                if (getAllCategory.length > 0) {
                    return res.status(200).send(controller.successFormat({
                        "data": getAllCategory
                    }, "service", 200));
                }
                return res.status(200).send(controller.successFormat({
                    "data": []
                }, "service", 200));
            }
            catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message": check.error
                }, 'service', 400));
            }
        },
        async services(req, res) {
            try {
                if (req.query.service_name) {
                    req.query.service_name = req.query.service_name.toLowerCase()
                    let getService = await service.find({ service_name: { $regex: new RegExp(req.query.service_name) } })
                    if (getService.length > 0) {
                        return res.status(200).send(controller.successFormat({
                            "data": getService
                        }, "service", 200));
                    }
                    return res.status(200).send(controller.successFormat({
                        "data": []
                    }, "service", 200));
                }
                let getService = await service.find({})
                if (getService.length > 0) {
                    return res.status(200).send(controller.successFormat({
                        "data": getService
                    }, "service", 200));
                }
                return res.status(200).send(controller.successFormat({
                    "data": []
                }, "service", 200));
            }
            catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message": err.message
                }, 'service', 400));
            }
        },
        async vehicle(req, res) {
            try {
                if (req.query.vehicle_name) {
                    req.query.vehicle_name = req.query.vehicle_name.toLowerCase()
                    let getVehicle = await vehicles.find({ vehicle_name: { $regex: new RegExp(req.query.vehicle_name) }, status: true })
                    if (getVehicle.length > 0) {
                        return res.status(200).send(controller.successFormat({
                            "data": getVehicle
                        }, "service", 200));
                    }
                    return res.status(200).send(controller.successFormat({
                        "data": []
                    }, "service", 200));
                }
                let getVehicle = await vehicles.find({ status: true })
                if (getVehicle.length > 0) {
                    return res.status(200).send(controller.successFormat({
                        "data": getVehicle
                    }, "service", 200));
                }
                return res.status(200).send(controller.successFormat({
                    "data": []
                }, "service", 200));
            }
            catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message": err.message
                }, 'service', 400));
            }
        },

        async descripton(req, res) {
            try {
                let getDescription = await description.find({ vehicle_id: req.params.vehicle_id })
                    .populate({
                        path: 'category_id',
                        select: 'category_name'
                    })
                    .populate({
                        path: 'service_id',
                        select: 'service_name'
                    })
                    .populate({
                        path: 'vehicle_id',
                        select: 'vehicle_name vehicle_cc'
                    })

                if (getDescription.length > 0) {
                    return res.status(200).send(controller.successFormat({
                        "data": getDescription
                    }, "service", 200));
                }
                return res.status(200).send(controller.successFormat({
                    "data": []
                }, "service", 200));
            }
            catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message": err.message
                }, 'service', 400));
            }
        },
    }
}

module.exports = getDetails()