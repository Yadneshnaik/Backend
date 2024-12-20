const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Add a booking
router.post('/', async (req, res) => {
    try {
        const { serviceId, planId } = req.body;

        // Validate input
        if (!serviceId || !planId) {
            return res.status(400).json({ error: 'Service ID and Plan ID are required' });
        }

        // Create a new booking
        const newBooking = new Booking({ serviceId, planId });
        await newBooking.save();

        res.status(201).json({ message: 'Booking successful!', booking: newBooking });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Failed to create booking' });
    }
});

module.exports = router;
