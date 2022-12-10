const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');

exports.createCourse = async (req, res) => {
  try {
    await Course.create({ ...req.body, user: req.session.userID });
    res.status(201).redirect('/courses');
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const category = await Category.findOne({ slug: categorySlug });
    //!---------------------------
    let filter = {};
    if (categorySlug) {
      // Eger linkte query varsa yani menuden bir bolum secilmisse secilen query ile tum kurslar icerisinde arama yapacagiz.
      filter = { category: category._id };
    }
    //!---------------------------
    const courses = await Course.find(filter)
      .sort('-createdAt')
      .populate('user'); // En son olusturulan ilk basta gozukecek.
    const categories = await Category.find(); // Kategori isimlerini aldik ve menuye yazdirmak icin render ettik.

    res.status(200).render('courses', {
      page_name: 'courses',
      courses,
      categories,
    });
  } catch {
    res.status(400).json({
      status: 'fail',
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const categories = await Category.find();
    const user = await User.findById(req.session.userID);
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      'user'
    );
    res
      .status(200)
      .render('course', { page_name: 'courses', course, categories, user });
  } catch {
    res.status(400).json({
      status: 'fail',
    });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    user.courses.push({ _id: req.body.course_id });
    await user.save();

    res.status(200).redirect('/users/dashboard');
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
};

exports.releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID); // Anlik kullanicinin verilerini aldik
    user.courses.pull({ _id: req.body.course_id });
    await user.save();

    res.status(202).redirect('/users/dashboard');
  } catch {
    res.status(400).json({
      status: 'fail',
    });
  }
};
