const express = require('express');
require('dotenv').config();
const cors = require('cors'); 
const connectDB = require('../db/conn');
const morgan = require('morgan'); // ✅ logger

const app = express();
app.use(cors({
  origin: '*',
}));
app.use(express.json());
app.use(express.static('public'));

app.use(morgan(':method :url :status - :response-time ms'));

connectDB();

const routes = require('./routes/indexRoute');
app.use('/', routes);

const PORT = process.env.ADMIN_PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Admin server running on port ${PORT}`);
});
