const express = require('express');
const router = express.Router();

const studentcontroller = require('../controllers/student_contollers');

router.get('/vishnu',studentcontroller.vishnu);

module.exports = router;