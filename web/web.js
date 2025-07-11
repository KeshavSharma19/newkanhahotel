const express = require("express");
require('dotenv').config();
const app = express();
const connectDB = require('../db/conn');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auth routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use('/api/rooms', require('./routes/room.routes'));

connectDB();


app.get('/', (req, res) => {
    res.send('Hello, Express!');
});




app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});