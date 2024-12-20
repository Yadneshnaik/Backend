const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
    },
    planId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan',
        required: true,
    },
    bookingDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Booking', BookingSchema);
