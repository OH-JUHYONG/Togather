const express = require('express');
const router = express.Router();

const loginRouter = require('./googlelogin');
const redirectRouter = require('./redirect/googleredirect');

router.use('/login',loginRouter);
router.use('/login/redirect',redirectRouter);

module.exports = router;