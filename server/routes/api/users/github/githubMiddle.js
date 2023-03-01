const express = require('express');
const router = express.Router();

const loginRouter = require('./githublogin');
const redirectRouter = require('./redirect/githubredirect');

router.use('/login',loginRouter);
router.use('/login/redirect',redirectRouter);

module.exports = router;