const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    features: [String],
});

module.exports = mongoose.model('Plan', planSchema);
