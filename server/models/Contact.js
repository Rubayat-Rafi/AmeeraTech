const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName:  { type: String, required: true, trim: true },
  email:     { type: String, required: true, trim: true, lowercase: true },
  projectType: { type: String, required: true },
  details:   { type: String, required: true },
  read:      { type: Boolean, default: false },
}, { timestamps: true })

module.exports = mongoose.model('Contact', contactSchema)
