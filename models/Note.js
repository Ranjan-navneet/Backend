const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    body: {
      type: String,
      required: [true, 'Note body is required'],
      trim: true,
    },
    author: {
      type: String,
      default: 'You',
      trim: true,
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: '#fdf6f0',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Note', noteSchema);
