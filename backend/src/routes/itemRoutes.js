const express = require('express');
const { addItem, getItems, getItem, updateItem, deleteItem, deleteAllItems } = require('../controllers/itemController');
const router = express.Router();

router.post('/', addItem);
router.get('/', getItems);
router.get('/:id', getItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);
router.delete('/', deleteAllItems);

module.exports = router;
