const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
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
noteSchema.index({ title: 'text', content: 'text' });
// Index for userId queries
noteSchema.index({ userId: 1 });

module.exports = mongoose.model('Note', noteSchema);
