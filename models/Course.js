const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: { type: String, unique: true, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
  slug: { type: String, unique: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Category ile Course arasinda iliski kurduk
});

CourseSchema.pre('validate', function (next) {
  // Sema olusturmadan once slugify olusturuyoruz.
  // Arrow Function'da this yok.
  this.slug = slugify(this.name, {
    lower: true,
    strict: true, // Ozel karakterleri kaldirir.
  });

  next();
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
