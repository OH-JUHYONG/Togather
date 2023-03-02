const express = require('express');
const router = express.Router();
const key = require('../../../../config/dev');

router.get('/',(req,res) => {
    const url=`https://accounts.google.com/o/oauth2/v2/auth?client_id=${key.google_Client_ID}&redirect_uri=${key.google_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;
    
    return res.send(url);
})

module.exports = router;1