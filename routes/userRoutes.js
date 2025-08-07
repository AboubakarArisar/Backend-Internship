const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/:id/favorites', userController.addToFavorites);
router.delete('/:id/favorites', userController.removeFromFavorites);
router.get('/:id/favorites', userController.getUserFavorites);
router.get('/:id/books', userController.getUserOwnedBooks);

module.exports = router; 