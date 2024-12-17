const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Import Routes
const servicesRoutes = require('./routes/services');
const contactsRoutes = require('./routes/contacts');
const aboutUsRoutes = require('./routes/aboutus');

// Routes Middleware
app.use('/api/services', servicesRoutes); // Route for services
app.use('/api/contacts', contactsRoutes); // Route for contacts
app.use('/api/aboutus', aboutUsRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Billing Software API is Running');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
