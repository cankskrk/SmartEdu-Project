const express = require('express');
const mongoose = require('mongoose');

const pageController = require('./controllers/pageController');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
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

// Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', pageRoute);
//!---------------------------
app.use('/courses', courseRoute);

// Listen PORT
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});
