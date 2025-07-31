const express = require('express');
require('dotenv').config();
const cors = require('cors'); 
const app = express();
const connectDB = require('../db/conn');
const morgan = require('morgan'); // ✅ logger

app.use(cors({
  origin: '*',
}));
app.use(express.json());
app.use(express.static('public'));

app.use(morgan(':method :url :status - :response-time ms'));

connectDB();

const routes = require('./routes/indexRoute');
app.use('/', routes);

const PORT = 5500;
app.listen(PORT, () => {
  console.log(`🚀 Admin server running on port ${PORT}`);
});
