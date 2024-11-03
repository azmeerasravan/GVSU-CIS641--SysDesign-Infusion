const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

const userRoutes = require('./routes/user');
const appointmentRoutes = require('./routes/appointments');

const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type, Authorization',
};

require('dotenv').config();

app.use(cors(corsOptions));
app.use(express.json());


app.use('/api', userRoutes);
app.use('/api', appointmentRoutes);

// MongoDB connection
mongoose.connect('mongodb+srv://sridevibommidi12:<db_password>.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log('Server running on port 5000');
});