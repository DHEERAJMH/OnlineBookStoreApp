const moongose = require('mongoose');

const orderSchema = new moongose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        city: {
            type: String,
            required: true
        },
        country: String,
        state: String,
        zipcode: String,
    },
    phone: {
        type: Number,
        required: true
    },
    productids:[
        {
            type: moongose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true,
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    }
},{
    timestamps: true
})

const Order = moongose.model('Order', orderSchema);

module.exports = Order;