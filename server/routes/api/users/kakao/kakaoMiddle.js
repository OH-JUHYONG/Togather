const express = require('express');
const router = express.Router();

const loginRouter = require('./kakaologin');
const redirectRouter = require('./redirect/kakaoredirect');

router.use('/login',loginRouter);
router.use('/login/redirect',redirectRouter);

module.exports = router;