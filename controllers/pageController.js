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

// Get Contact Page
exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};

// Send Email
exports.sendEmail = (req, res) => {
  console.log(req.body);
  res.redirect('/contact');
};

// Get Register Page
exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};

// Get Login Page
exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};
