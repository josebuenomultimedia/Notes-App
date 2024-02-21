const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const noteRoutes = require('./routes/noteRoutes');
const connectionString = "mongodb+srv://josebuenomultimedia:qpMoITrkErOKh7Ur@notedb.moytpan.mongodb.net/?retryWrites=true&w=majority";
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB 
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.json());

app.use('/api', noteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

