const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json({
      status: 'success',
      course, // Yazilan kursu json olarak gonderdik!
    });
  } catch {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.getAllPhotos = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).render('courses', {
      page_name: 'courses',
      courses,
    });
  } catch {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
