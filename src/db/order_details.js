const mongoose = require('mongoose');


let schema = new mongoose.Schema({
    orderDetails: { type: mongoose.Schema.Types.Mixed },
    isVerified: { type: Boolean, default: false },
    status: { type: String, default: "Unpaid" }
}, {
    timestamps: { createdAt: 'created_date', updatedAt: 'modified_date' }
});



let addCartSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', index: true },
    description: { type: String },
    category_name: { type: String, required: true },
    amount: { type: Number },
    service_details: {
        vehicle_cc: { type: String },
        model_year: { type: String },
        vehicle_owner_name: { type: String },
        vehicle_no: { type: String }
    },
    brand: { type: String, required: true },
    location: { type: String, required: true },
    service_id: { type: String, required: true },
    mobile_number: { type: String, required: true },
    price: { type: Number, required: true },
    address: { type: String, required: true },
    service_type: { type: String, required: true }

}, {
    timestamps: { createdAt: 'created_date', updatedAt: 'modified_date' }
});

let orderDetail = mongoose.model('order-details', schema);
orderDetail.createIndexes();
exports.orderDetail = orderDetail

let addCart = mongoose.model('add-cart', addCartSchema);
addCart.createIndexes();
exports.addCarts = addCart
