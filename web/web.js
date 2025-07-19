const express = require("express");
require('dotenv').config();
const app = express();
const cors = require('cors');
const connectDB = require('../db/conn');
const morgan = require('morgan');
app.use(cors({
  origin: '*',
}));
app.use(express.json());
app.use(express.static('public'));
app.use(morgan(':method :url :status - :response-time ms'));
app.use(express.urlencoded({ extended: true }));


connectDB();

const routes = require('./routes/indexRoute');
app.use('/', routes);


const PORT = process.env.WEB_PORT || 7000;
app.listen(PORT, () => {
  console.log(`🚀 Web server running on port ${PORT}`);
});

