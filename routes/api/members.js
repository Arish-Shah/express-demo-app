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
  // res.json({ id: newMember.id });
  res.redirect('/');
});

// Update member
router.put('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    members.forEach(member => {
      const { name, email } = req.body;
      member.name = name ? name : member.name;
      member.email = email ? email : member.email;

      res.json({ message: 'Member updated', member });
    });
  } else {
    res.status(400).json({ message: `No member with id ${req.params.id}` });
  }
});

// Delete member
router.delete('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    const updatedMembers = members.filter(
      member => member.id !== parseInt(req.body.id)
    );
    res.json({ message: 'Member deleted', members: updatedMembers });
  } else {
    res.status(400).json({ message: `No member with id ${req.params.id}` });
  }
});

module.exports = router;
