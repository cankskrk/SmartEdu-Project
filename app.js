const express = require('express');

const pageController = require('./controllers/pageController');
const pageRoute = require('./routes/pageRoute');
const app = express();
const PORT = 3000;

// Template Engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));

// Routes
app.use('/', pageRoute);
app.use('/about', pageRoute);
app.use('/courses', pageRoute);
app.use('/dashboard', pageRoute);
app.use('/contact', pageRoute);

// Listen PORT
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});
