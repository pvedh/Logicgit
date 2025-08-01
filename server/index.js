const express = require('express');
const cors = require('cors');
const axios = require('axios');

const githubRoutes = require('./routes/githubRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/github', githubRoutes);

const PORT = process.env.PORT || 4500; // Change the port to 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});