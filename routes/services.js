const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const Plan = require('../models/Plan');

// Add a new service
router.post('/add', async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const newService = new Service({ title, description });
    await newService.save();
    res.status(201).json({ message: 'Service added successfully!', service: newService });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add service' });
  }
});

// Add a plan to a specific service
router.post('/:id/plans', async (req, res) => {
  try {
    const { name, price, features } = req.body;

    if (!name || !price || !features) {
      return res.status(400).json({ error: 'Name, price, and features are required' });
    }

    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    const newPlan = new Plan({
      name,
      price,
      features,
      serviceId: service._id,
    });

    await newPlan.save();
    res.status(201).json({ message: 'Plan added successfully!', plan: newPlan });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add plan' });
  }
});

// Get all plans for a specific service
router.get('/:id/plans', async (req, res) => {
  try {
    const plans = await Plan.find({ serviceId: req.params.id });
    if (plans.length === 0) {
      return res.status(404).json({ error: 'No plans found for this service' });
    }
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching plans' });
  }
});

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

module.exports = router;
