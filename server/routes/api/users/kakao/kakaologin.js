const express = require('express');
const router = express.Router();
const key = require('../../../../config/dev');


router.get('/',(req,res) => {
    const url=`https://kauth.kakao.com/oauth/authorize?client_id=${key.kakao_REST_API}&redirect_uri=${key.kakao_REDIRECT_URI}&response_type=code&prompt=login`;
    
    return res.send(url);
})

module.exports = router;