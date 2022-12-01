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
app.get('/courses', pageController.getCoursesPage);
app.get('/dashboard', pageController.getDashboardPage);
app.get('/contact', pageController.getContactPage);

// Listen PORT
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});
