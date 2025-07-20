const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); 
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectDB = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');

connectDB(); // Connect to the database

// CORS (Cross-Origin Resource Sharing) is like a security guard in the browser.
//  It blocks requests between different origins unless you give explicit permission.
// http://localhost:5173 (React)
// http://localhost:4000 (Express)
// These are different origins, so the browser is suspicious and blocks cookies unless you set the rules very carefully.

// ✅ Updated CORS config
const allowedOrigins = [
  'http://localhost:5173',
  'https://h9gwrnq8-5173.inc1.devtunnels.ms'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true  // Allow cookies/session headers if needed
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Middleware to parse cookies

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);

module.exports = app;
