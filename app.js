const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');
const app = express();
const PORT = 3000;

// Connect Database
mongoose
  .connect('mongodb://127.0.0.1:27017/smartedu-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch(() => {
    console.log('Could not connect to the database, please try again!');
  });

// Template Engine
app.set('view engine', 'ejs');

// Global Variable
global.userID = null;

// Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
app.use('*', (req, res, next) => {
  userID = req.session.userID;
  next();
});
//!---------------------------
app.use('/', pageRoute);
//!---------------------------
app.use('/courses', courseRoute);
//!---------------------------
app.use('/categories', categoryRoute);
//!---------------------------
app.use('/users', userRoute);

// Listen PORT
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});
