const mongoose = require('mongoose');
const validator = require('validator');

const bookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    url: {
      type: String,
      required: [true, 'URL is required'],
      validate: [validator.isURL, 'Please provide a valid URL'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function(tags) {
          return tags.every(tag => typeof tag === 'string' && tag.length > 0);
        },
        message: 'Tags must be non-empty strings',
      },
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Index for search
bookmarkSchema.index({ title: 'text', description: 'text' });
// Index for userId queries
bookmarkSchema.index({ userId: 1 });

module.exports = mongoose.model('Bookmark', bookmarkSchema);
