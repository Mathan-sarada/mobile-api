const { orderDetail } = require('../db/order_details')
const crypto = require('crypto')
const controller = require('./controller')
const payment = () => {
    return {
        async verifyPayment(req, res) {
            try {
                const RAZORPAY_SECRET = 'qA6gM5gH4tH3hI9p'
                console.log(req.body)
                const signature = crypto.createHmac('sha256', RAZORPAY_SECRET)
                signature.update(JSON.stringify(req.body))
                const digest = signature.digest('hex')
                if (digest === req.headers['x-razorpay-signature']) {
                    
                    let response = req.body.payload.payment.entity;
                    if (req.body.event == "payment.captured" && response.status == 'captured') {
                        let order = await orderDetail.findOne({_id: response.notes.order_id})
                        if(order.totalAmount == response.amount){
                            order.status ='Paid',
                            order.save()
                        }else{
                            await orderDetail.findOneAndUpdate({ _id: response.notes.order_id }, { status: "Reject/Amount is mismatch" })
                        }
                    } else {
                        await orderDetail.findOneAndUpdate({ _id: response.notes.order_id }, { status: "Reject/Event doesn't exits" })
                    }
                }
                res.json({ status: 'ok' })
            } catch (err) {
                return res.status(400).send(controller.errorMsgFormat({
                    "message": err.message
                }, 'service', 400));
            }
        }

    }
}

module.exports = payment()