const express = require('express');
const Discussion = require('../models/Discussion');

const router = express.Router();

// Route to create a new discussion
router.post('/api/discussions', async (req, res) => {
    const { title, content, authorId } = req.body;
console.log(title, content)
    // Validate input
    if (!title || !content ) {
        return res.status(400).json({ error: 'Title, content, and authorId are required' });
    }

    try {
        // Create and save a new discussion
        const newDiscussion = new Discussion({
            title,
            content,
            author: authorId,
        });

        const savedDiscussion = await newDiscussion.save();

        // Return the created discussion
        res.status(201).json({
            message: 'Discussion created successfully',
            discussion: savedDiscussion,
        });
    } catch (error) {
        console.error('Error creating discussion:', error);
        res.status(500).json({ error: 'An error occurred while creating the discussion' });
    }
});

module.exports = router;
