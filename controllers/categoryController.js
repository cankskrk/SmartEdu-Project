const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);

    req.flash('Success', `${category.name} has been created succcessfully!`);
    res.status(200).redirect('/users/dashboard');
  } catch {
    req.flash('Error', `Something happened!`);
    res.status(400).redirect('/users/dashboard');
  }
};

// Delete A Category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndRemove(req.params.id);
    req.flash('Success', `${category.name} has been removed succcessfully!`);
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    req.flash('Error', `Something happened!`);
    res.status(400).redirect('/users/dashboard');
  }
};
