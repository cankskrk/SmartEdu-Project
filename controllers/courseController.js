const Course = require('../models/Course');
const Category = require('../models/Category');

exports.createCourse = async (req, res) => {
  try {
    await Course.create(req.body);
    res.status(201).redirect('/courses');
  } catch {
    res.status(400).json({
      status: 'fail',
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
    const courses = await Course.find(filter);
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
    const course = await Course.findOne({ slug: req.params.slug });
    res
      .status(200)
      .render('course', { page_name: 'courses', course, categories });
  } catch {
    res.status(400).json({
      status: 'fail',
    });
  }
};
