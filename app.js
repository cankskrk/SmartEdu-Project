const express = require('express');

const pageController = require('./controllers/pageController');
const app = express();
const PORT = 3000;

// Template Engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));

// Routes
app.get('/', pageController.getMainPage);
app.get('/about', pageController.getAboutPage);
app.get('/courses', pageController.getCoursesPage);
app.get('/dashboard', pageController.getDashboardPage);
app.get('/contact', pageController.getContactPage);

// Listen PORT
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});
