const express = require('express');
const router = express.Router();
const key = require('../../../../config/dev');

router.get('/',(req,res) => {
    const url=`https://github.com/login/oauth/authorize?client_id=${key.github_Client_ID}&login`;
    
    return res.send(url);
})

module.exports = router;