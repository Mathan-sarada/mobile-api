const controller = require('./controller')
const { vehicles } = require('../db/vehicle')
const { service, category } = require('../db/service')
const validation = require('../validation/details.validation')
const { user } = require('../db/user')
const { addCarts, orderDetail } = require('../db/order_details')

const orderDetails = () => {
    return {
        async addCarts(req, res) {
            try {
                let data = req.body.data;
                let checkUser = await user.findOne({ _id: req.params.user_id })
                if (!checkUser) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": "User Id  doesn't exit"
                    }, 'product-details', 400));
                }
                let checkService = await service.findOne({ _id: data.service_id ,status:true}).populate({
                    path: 'category_id',
                    select: 'category_name'
                })
                if (!checkService) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": " Service Name doesn't exit on catergory"
                    }, 'product-details', 400));
                }
                let payload;
                if (checkService.category_id.category_name == 'bike service') {
                    let { error } = await validation.addCartForBikeService(req.body.data)
                    if (error) {
                        return res.status(400).send(controller.errorFormat({
                            "message": error.message
                        }, "service", 400));
                    }

                    if (data.service_details.vehicle_cc) {
                        let checkVehicle = await vehicles.findOne({ vehicle_cc: data.service_details.vehicle_cc })
                        if (!checkVehicle) {
                            return res.status(400).send(controller.errorMsgFormat({
                                "message": "Vehicle cc doesn't exits"
                            }, 'product-details', 400));
                        }
                    }
                    let subDetails = data.service_details
                    payload = {
                        user_id: req.params.user_id,
                        description: checkService.description,
                        category_name: checkService.category_id.category_name,
                        price: checkService.price,
                        service_details: {
                            vehicle_cc: subDetails.vehicle_cc ? subDetails.vehicle_cc : null,
                            model_year: subDetails.model_year,
                            vehicle_owner_name: subDetails.vehicle_owner_name,
                            vehicle_no: subDetails.vehicle_no
                        },
                        brand: data.brand,
                        location: data.location,
                        service_name: checkService._service_name,
                        mobile_number: data.mobile_number,
                        address: data.address,
                        service_type: checkService.category_id.category_name
                    }

                }
                else {
                    let { error } = await validation.addCartForBatteryService(req.body.data)
                    if (error) {
                        return res.status(400).send(controller.errorFormat({
                            "message": error.message
                        }, "service", 400));
                    }
                    payload = {
                        user_id: req.params.user_id,
                        description: checkService.description,
                        category_name: checkService.category_id.category_name,
                        price: checkService.price,
                        brand: data.brand,
                        location: data.location,
                        service_name: checkService._service_name,
                        mobile_number: data.mobile_number,
                        address: data.address,
                        service_type: checkService.category_id.category_name
                    }
                }
                await new addCarts(payload).save()
                return res.status(200).send(controller.successFormat({
                    "message": "Add cart to you order"
                }, 'product-details', 200));
                // let i = 0, addCart = [], orderPayload
                // while (i < services.length) {
                //    
                //         let checkVehicle = await vehicles.findOne({ vehicle_cc: data.vehicle_cc, status: true });
                //         if (!checkVehicle) {
                //             return res.status(200).send(controller.successFormat({
                //                 "messsage": "Vehicle doesn't exits"
                //             }, 'vehicle', 200));
                //         }
                //         let checkServiceAndVehicle = await service.findOne({ _id: services[i], vehicle_id: checkVehicle._id })
                //         if (!checkServiceAndVehicle) {
                //             return res.status(400).send(controller.errorMsgFormat({
                //                 "message": " Service Name doesn't exit on vehicle cc"
                //             }, 'product-details', 400));
                //         }
                //         vehicle = {
                //             vehicle_cc: checkVehicle.vehicle_cc,
                //             vehicle_no: data.vehicle_no,
                //             vehicle_owner_name: data.vehicle_owner_name,
                //             model_year: data.model_year,
                //         }
                //     }
                //     let payload = {
                //         user_id: req.params.user_id,
                //         service_name: checkService.service_name,
                //         category_name: checkService.category_id.category_name,
                //         description: checkService.description,
                //         amount: checkService.price
                //     }
                //     addCart.push(payload)
                //     await new addCarts(payload).save()
                //     i++;
                // }
                // //console.log("add Carts:",addCart)

                // let j = 0;
                // let groupService = [], groupDescription = [], groupTotalPrice = [], groupCategory = []
                // while (j < addCart.length) {
                //     groupService.push(addCart[j].service_name);
                //     groupDescription.push(addCart[j].description);
                //     groupTotalPrice.push(addCart[j].amount)
                //     groupCategory.push(addCart[j].category_name)
                //     j++
                // }

                // orderPayload = {
                //     user_id: req.params.user_id,
                //     services: groupService,
                //     brand: data.brand,
                //     categories:groupCategory,
                //     description: groupDescription,
                //     price: groupTotalPrice,
                //     location: data.location,
                //     mobile_number: data.mobile_number,
                //     address: data.address,
                //     vehicle_details:vehicle

                // }
                // await new orderDetail(orderPayload).save()
                // return res.status(200).send(controller.successFormat({
                //     "message": "Add cart to you order",
                //     "count": addCart.length
                // }, 'product-details', 200));
            }
            catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message": err.message
                }, 'add-carts', 400));
            }
        },

        async getCarts(req, res) {
            try {
                let getService = await addCarts.find({ user_id: req.params.user_id })
                if (getService.length > 0) {
                    let chektotalPrice = 0, i = 0;
                    while (i < getService.length) {
                        chektotalPrice += getService[i].price
                        i++
                    }
                    return res.status(200).send(controller.successFormat({
                        "data": getService,
                        checkOutAmount: chektotalPrice
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

        async deleteCarts(req, res) {
            try {
                if (!req.query.cart_id) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": "Cart id is Required"
                    }, 'service', 400));
                }
                let getService = await addCarts.findOne({ user_id: req.params.user_id, _id: req.query.cart_id })
                if (!getService) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": "Cart id doesn't exits"
                    }, 'service', 400));
                }
                await addCarts.deleteOne({ _id: req.query.cart_id })
                return res.status(200).send(controller.successFormat({
                    "message": "Delete Successfully"
                }, "service", 200));
            }
            catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message": err.message
                }, 'service', 400));
            }
        },

        async checkOut(req, res) {
            try {
                let checkcarts = await addCarts.find({ user_id: req.params.user_id })
                if (checkcarts.length == 0) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message": "No items on your carts"
                    }, 'service', 400));
                }
                //await orderDetail.findOneAndUpdate({ user_id: req.params.user_id, is_check: false }, { is_check: true })
                let i = 0;
                let orders = []
                while (i < checkcarts.length > 0) {
                    delete checkcarts[i]._id
                    orders.push(checkcarts[i])
                    i++;
                }
                await new orderDetail({orderDetails:orders}).save()
                await addCarts.deleteMany({ user_id: req.params.user_id })
                return res.status(200).send(controller.errorMsgFormat({
                    "message": "Order Successfully"
                }, 'service', 200));
            }
            catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message": err.message
                }, 'service', 400));
            }

        }


    }
}
module.exports = orderDetails()