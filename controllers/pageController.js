// Get Main Page
exports.getMainPage = (req, res) => {
  res.status(200).render('index', {
    page_name: 'index',
  });
};

// Get About Page
exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};

// Get Dashboard Page
exports.getDashboardPage = (req, res) => {
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
  });
};

// Get Contact Page
exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};
