// routes/aboutus.js
const express = require('express');
const router = express.Router();
const AboutUs = require('../models/AboutUs');

// Get About Us content
router.get('/', async (req, res) => {
    try {
        const aboutUs = await AboutUs.findOne();
        if (aboutUs) {
            res.status(200).json(aboutUs);
        } else {
            res.status(404).json({ message: 'About Us content not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching About Us content' });
    }
});

// Add or update About Us content
router.post('/update', async (req, res) => {
    try {
        const { content } = req.body;
        let aboutUs = await AboutUs.findOne();

        if (aboutUs) {
            aboutUs.content = content;
        } else {
            aboutUs = new AboutUs({ content });
        }

        await aboutUs.save();
        res.status(200).json({ message: 'About Us content updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating About Us content' });
    }
});

module.exports = router;
