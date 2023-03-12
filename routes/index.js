const express = require('express');

const router = express.Router();
const homecontroller = require('../controllers/home_controllers');
console.log('router loaded');

router.get('/', homecontroller.home);

router.use('/users',require('./users'));
router.use('/posts', require('./posts'));

//for any further routes,access from here
//router.use('routerName',require('./routerfile'));
router.use('/student',require('./student'));

module.exports = router;

