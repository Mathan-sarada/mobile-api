const controller = require('./controller')
const { productDetails } = require('../db/product_details');
const { vendor } = require('../db/vendor')
const { orderDetails } = require('../db/order_details')
const orderDetail = () => {
    return {
        async addOrderDetails(req, res) {
            try {
                let data = req.body.data;
                let checkData = await productDetails.findOne({ _id: req.params.product_id })
                if (!checkData) {
                    return res.status(400).send(controller.errorMsgFormat({
                        "message:": "Product Id doesn't exit"
                    }, 'order-details', 400));
                }
                let payload ={
                    location: data.location,
                    mobile_number: data.mobile_number,
                    product_id:checkData._id
                }
                await new orderDetails(payload).save()
                return res.status(200).send(controller.successFormat({
                    "message:": "Order Have Been Successfully Added"
                }, 'order-details', 200));
            } catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message:": check.error
                }, 'order-details', 400));
            }

        }
       
    }
}

module.exports = orderDetail();