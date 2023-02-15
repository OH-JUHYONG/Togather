const express = require('express');
const router = express.Router();
const key = require('../../../../config/dev');


router.get('/key',(req,res) => {
    return res.send(`https://kauth.kakao.com/oauth/authorize?client_id=${key.kakao_REST_API}&redirect_uri=${key.kakao_REDIRECT_URI}&response_type=code`);
})

module.exports = router;