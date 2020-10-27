const controller = require('./controller')
const { productDetails } = require('../db/product_details');
const { vehicles } = require('../db/vehicle')
const { description, service } = require('../db/service')

const productDetail = () => {
    return {
        async addProduct(req, res) {
            try {
                let data = req.body.data;
                let addCart = []
                let services = data.services;
                let checkData = await vehicles.findOne({ _id: req.params.vehicle_id })
                if (!checkData) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": "Vehicle Name or CC doesn't exit"
                    }, 'product-details', 400));
                }
                let i = 0;
                while (i < services.length) {
                    console.log(services[i])
                    let checkService = await service.findOne({ _id: services[i] })
                    if (!checkService) {
                        return res.status(400).send(controller.errorMsgFormat({
                            "message": " Service Name doesn't exit"
                        }, 'product-details', 400));
                    }

                    let checkDescription = await description.findOne({ service_id: services[i], vehicle_id: checkData._id })
                    if (!checkDescription) {
                        return res.status(400).send(controller.errorMsgFormat({
                            "message": "Service Description doesn't exit"
                        }, 'product-details', 400));
                    }
                    let addPriceAndTax = await description.aggregate([
                        {
                            $match:
                            {
                                service_id: checkDescription.service_id,
                                vehicle_id: checkData._id
                            }
                        },
                        {
                            $group: {
                                _id: '$service_id',
                                totalPrice: { $sum: '$price' },
                                totalTax: { $sum: '$tax' },
                                description: { $push: '$description' }
                            }
                        }
                    ])
                    addCart.push(addPriceAndTax)
                    i++;
                }

                console.log(JSON.stringify(addCart))
                let payload = {
                    total_amount: addPriceAndTax[0].totalPrice,
                    total_tax: addPriceAndTax[0].totalTax,
                    description: addPriceAndTax[0].description,
                    service_id: checkService._id,
                    vehicle_id: checkData._id
                }
                payload.total_amount += payload.total_tax
                let savePayload = await new productDetails(payload).save();
                payload.productId = savePayload._id
                return res.status(200).send(controller.successFormat({
                    "data:": payload
                }, 'product-details', 200));
            }
            catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message": err
                }, 'product-details', 400));
            }
        }
    }
}
module.exports = productDetail()