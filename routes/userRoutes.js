const express = require('express');
const userController = require('../controllers/userController')
const router = express.Router();

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.put('/update/:userId', userController.update)
router.delete('/delete/:userId', userController.delete)

module.exports = router;
