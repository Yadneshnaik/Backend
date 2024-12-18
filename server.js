const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Improved MongoDB Connection with Error Handling
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1); // Exit process with failure code
  });

// Example of Adding Default Route for Debugging
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Import and Use Routes
try {
  const servicesRoutes = require('./routes/services');
  const contactsRoutes = require('./routes/contacts');;
  const aboutUsRoutes = require('./routes/aboutus');

  app.use('/api/services', servicesRoutes);
  app.use('/api/contacts', contactsRoutes);
  app.use('/api/aboutus', aboutUsRoutes);
} catch (error) {
  console.error('Error loading routes:', error.message);
  process.exit(1); // Exit process if routes fail
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
