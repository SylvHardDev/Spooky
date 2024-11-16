const express = require('express');
const ordonnanceController = require('../controllers/ordonnanceController');
const router = express.Router();

router.post('/', ordonnanceController.createOrdonnance);
router.get('/', ordonnanceController.getAllOrdonnances);
router.get('/:id', ordonnanceController.getOrdonnanceById);
router.put('/:id', ordonnanceController.updateOrdonnance);
router.delete('/:id', ordonnanceController.deleteOrdonnance);

module.exports = router;
