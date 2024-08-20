const express = require('express');

const router = express.Router();
const Patent = require('../models').Patent;
const User = require('../models').User;
const { authenticateUser } = require('../middleware/auth-user');
const { asyncHandler } = require('../middleware/async-handler');

// Return all patents
router.get('/patents', asyncHandler(async (req, res) => {
  let patents = await Patent.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
    include: {
      model: User,
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      }
    }
  });
  res.json(patents);
}));

// Return a specific patent
router.get('/patents/:id', asyncHandler(async (req, res) => {
  const patent = await Patent.findByPk(req.params.id, {
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
    include: {
      model: User,
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      }
    }
  });
  if (patent) {
    res.json(patent);
  } else {
    res.json({
      "error": "Sorry, we couldn't find the patent you were looking for."
    });
  }
}));

// Create a patent
router.post('/patents', authenticateUser, asyncHandler(async (req, res) => {
  try {
    const { title, description, inventors, country, date, patentNumber, userId } = req.body;
    const newPatent = await Patent.create({
      title,
      description,
      inventors,
      country,
      date,
      patentNumber,
      userId, // Ensure this is correctly passed
    });
    res.status(201)
      .location(`/patents/${newPatent.dataValues.id}`)
      .end();
  } catch (error) {
    console.log('ERROR: ', error.name);
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }
}));

// Update an existing course
router.put("/patents/:id", authenticateUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;
  let patent;
  try {
    patent = await Patent.findByPk(req.params.id);
    if (patent) {
      if (patent.userId === user.id) { // Corrected user ID comparison
        await patent.update(req.body);
        res.status(204).end();
      } else {
        res.status(403).json({ error: 'You are not authorised to update this patent.' });
      }
    } else {
      res.status(404).json({ error: 'Patent Not Found' });
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }
}));


// Delete an existing course
router.delete("/patents/:id", authenticateUser, asyncHandler(async (req, res, next) => {
  const user = req.currentUser;
  const patent = await Patent.findByPk(req.params.id);
  if (patent) {
    if (patent.userId === user.id) {  // Use patent.UserId to match the current user's id
      await patent.destroy();  // Corrected to patent.destroy()
      res.status(204).end();
    } else {
      res.status(403).json({ error: 'You are not authorised to delete this patent.' });
    }
  } else {
    const err = new Error(`Patent Not Found`);
    res.status(404).json({ error: err.message });
  }
}));


module.exports = router;

