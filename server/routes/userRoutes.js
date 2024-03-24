const express = require('express');
const { registerUser, loginUser, getUsers, updateInfo } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/get-users', getUsers);
router.post('/update-user', updateInfo)
module.exports = router