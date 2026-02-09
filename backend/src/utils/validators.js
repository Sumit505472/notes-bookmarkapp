const validator = require('validator');

exports.validateNote = (data) => {
  const errors = {};

  if (!data.title || !data.title.trim()) {
    errors.title = 'Title is required';
  } else if (data.title.length > 200) {
    errors.title = 'Title cannot exceed 200 characters';
  }

  if (!data.content || !data.content.trim()) {
    errors.content = 'Content is required';
  }

  if (data.tags && !Array.isArray(data.tags)) {
    errors.tags = 'Tags must be an array';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

exports.validateBookmark = (data) => {
  const errors = {};

  if (!data.url || !data.url.trim()) {
    errors.url = 'URL is required';
  } else if (!validator.isURL(data.url)) {
    errors.url = 'Please provide a valid URL';
  }

  if (data.title && data.title.length > 200) {
    errors.title = 'Title cannot exceed 200 characters';
  }

  if (data.description && data.description.length > 500) {
    errors.description = 'Description cannot exceed 500 characters';
  }

  if (data.tags && !Array.isArray(data.tags)) {
    errors.tags = 'Tags must be an array';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
