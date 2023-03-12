const express = require('express');
const router = express.Router();
const passport = require('passport');

const userscontroller = require('../controllers/users_controllers');

router.get('/profile',userscontroller.profile);

router.get('/sign-up',userscontroller.signUp);
router.get('/sign-in',userscontroller.signIn);


router.post('/create', userscontroller.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
),userscontroller.createSession);

router.get('/sign-out', userscontroller.destroySession);

module.exports = router;

//views->controllers->routes