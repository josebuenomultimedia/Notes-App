const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
// Active notes routes
router.get('/notes', noteController.getAllActiveNotes);
router.post('/notes', noteController.createNote);
router.put('/notes/:id', noteController.updateNote);
router.delete('/notes/:id', noteController.deleteNote);

// Archived notes routes
router.get('/archived', noteController.getAllArchivedNotes);
router.post('/archived', noteController.createArchivedNote);
router.put('/archive/:id', noteController.archiveNote);
router.put('/unarchive/:id', noteController.unarchiveNote);
router.delete('/archived/:id', noteController.deleteArchivedNote);
router.put('/removeCategory/:id', noteController.removeCategory);

module.exports = router;