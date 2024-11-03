const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUserRole } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update-category', updateUserRole);

module.exports = router;
