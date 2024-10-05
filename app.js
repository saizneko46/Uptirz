// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const csrf = require('csurf');
const session = require('express-session');
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

// Security Headers
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Limit requests to prevent DDoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CSRF Protection
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Session management
app.use(session({
  secret: 'YOUR_SECRET_KEY',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/uptimeMonitor', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
const uptimeRoutes = require('./routes/uptimeRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/uptime', uptimeRoutes);
app.use('/api/users', userRoutes);
app.use('/admin', adminRoutes); // Admin route hidden with custom protection

// Error handling middleware
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

module.exports = app;
