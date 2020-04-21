const express = require('express');
const uuid = require('uuid');
const members = require('../../Members');

const router = express.Router();

// Get all members
router.get('/', (req, res) => res.json(members));

// Get single member
router.get('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ message: `No member with id ${req.params.id}` });
  }
});

// Create member
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ message: 'Please include name and email' });
  }

  members.push(newMember);
  res.json({ id: newMember.id });
});

module.exports = router;
