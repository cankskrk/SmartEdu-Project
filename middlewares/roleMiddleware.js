exports.addCourse = (roles) => {
  return (req, res, next) => {
    const userRole = req.session.userRole;
    if (roles.includes(userRole)) {
      next();
    } else {
      return res.status(401).send('YOU CANNOT DO IT!');
    }
  };
};

exports.deleteUser = (role) => {
  return (req, res, next) => {
    const userRole = req.session.userRole;
    if (userRole === role) {
      next();
    } else {
      return res.status(401).send('Something Wrong!');
    }
  };
};
