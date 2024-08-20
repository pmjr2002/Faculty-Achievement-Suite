const express = require('express');

const router = express.Router();
const Paper = require('../models').Paper;
const User = require('../models').User;
const { authenticateUser } = require('../middleware/auth-user');
const { asyncHandler } = require('../middleware/async-handler');

// Return all papers
router.get('/papers', asyncHandler(async (req, res) => {
  let papers = await Paper.findAll({
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
  res.json(papers);
}));

// Return a specific course
router.get('/papers/:id', asyncHandler(async (req, res) => {
  const paper = await Paper.findByPk(req.params.id, {
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
  if (paper) {
    res.json(paper);
  } else {
    res.json({
      "error": "Sorry, we couldn't find the course you were looking for."
    });
  }
}));

// Create a course
router.post('/papers', authenticateUser, asyncHandler(async (req, res) => {
  try {
    const { title, description, authors, conference, date, userId } = req.body;
    const newPaper = await Paper.create({
      title,
      description,
      authors,
      conference,
      date,
      userId, // Ensure this is correctly passed
    });
    res.status(201)
      .location(`/papers/${newPaper.dataValues.id}`)
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
router.put("/papers/:id", authenticateUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;
  let paper;
  try {
    paper = await Paper.findByPk(req.params.id);
    if (paper) {
      if (paper.userId === user.id) { // Corrected user ID comparison
        await paper.update(req.body);
        res.status(204).end();
      } else {
        res.status(403).json({ error: 'You are not authorised to update this paper.' });
      }
    } else {
      res.status(404).json({ error: 'Paper Not Found' });
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
router.delete("/papers/:id", authenticateUser, asyncHandler(async (req, res, next) => {
  const user = req.currentUser;
  const paper = await Paper.findByPk(req.params.id);
  if (paper) {
    if (paper.userId === user.id) {  // Use paper.UserId to match the current user's id
      await paper.destroy();  // Corrected to paper.destroy()
      res.status(204).end();
    } else {
      res.status(403).json({ error: 'You are not authorised to delete this paper.' });
    }
  } else {
    const err = new Error(`Paper Not Found`);
    res.status(404).json({ error: err.message });
  }
}));


module.exports = router;

