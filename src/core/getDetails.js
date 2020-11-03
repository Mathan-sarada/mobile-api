const controller = require('./controller')
const { category, service, description, location } = require('../db/service')
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
                let getAllCategory = await category.find({ status: true })
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
                if (req.query.category_id) {
                    let getService = await service.find({ category_id: req.query.category_id, status: true })
                        .populate({
                            path: 'category_id',
                            select: 'category_name'
                        })
                        .populate({
                            path: 'vehicle_id',
                            select: 'vehicle_cc'
                        })
                    if (getService.length > 0) {
                        return res.status(200).send(controller.successFormat({
                            "data": getService
                        }, "service", 200));
                    }
                    return res.status(200).send(controller.successFormat({
                        "data": []
                    }, "service", 200));
                }
                let getService = await service.find({ status: true }).populate({
                    path: 'category_id',
                    select: 'category_name'
                })
                    .populate({
                        path: 'vehicle_id',
                        select: 'vehicle_cc'
                    })
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
                if (req.query.vehicle_cc) {
                    req.query.vehicle_cc = req.query.vehicle_cc.toLowerCase()
                    let getVehicle = await vehicles.find({ vehicle_cc: { $regex: new RegExp(req.query.vehicle_cc) }, status: true })
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

        // async descripton(req, res) {
        //     try {
        //         let getDescription = await description.find({ vehicle_id: req.params.vehicle_id })
        //             .populate({
        //                 path: 'category_id',
        //                 select: 'category_name'
        //             })
        //             .populate({
        //                 path: 'service_id',
        //                 select: 'service_name'
        //             })
        //             .populate({
        //                 path: 'vehicle_id',
        //                 select: 'vehicle_cc vehicle_cc'
        //             })

        //         if (getDescription.length > 0) {
        //             return res.status(200).send(controller.successFormat({
        //                 "data": getDescription
        //             }, "service", 200));
        //         }
        //         return res.status(200).send(controller.successFormat({
        //             "data": []
        //         }, "service", 200));
        //     }
        //     catch (err) {
        //         return res.status(400).send(controller.errorMsgFormat({
        //             "message": err.message
        //         }, 'service', 400));
        //     }
        // },
        async location(req, res) {
            try {
                if (req.query.location_name) {
                    let getLocation = await location.findOne({ location: req.query.location_name })
                    if (getLocation) {
                        return res.status(200).send(controller.successFormat({
                            "data": getLocation
                        }, "service", 200));
                    }
                    return res.status(200).send(controller.successFormat({
                        "data": null
                    }, "service", 200));
                }

                let getLocation = await location.find({})
                if (getLocation.length > 0) {
                    return res.status(200).send(controller.successFormat({
                        "data": getLocation
                    }, "service", 200));
                }
                return res.status(200).send(controller.successFormat({
                    "data": null
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