const express = require('express');
const connectDB = require('../db/conn.js');

const app = express();

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
