const express = require('express')
const router = express.Router()
const Contact = require('../models/Contact')
const auth = require('../middleware/auth')

// Public — submit contact form
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, projectType, details } = req.body
    const contact = await Contact.create({ firstName, lastName, email, projectType, details })
    res.status(201).json(contact)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Admin — get all contacts
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })
    res.json(contacts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Admin — mark as read
router.patch('/:id/read', auth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    )
    res.json(contact)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Admin — delete
router.delete('/:id', auth, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
