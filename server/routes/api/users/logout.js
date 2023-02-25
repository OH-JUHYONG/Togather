const express = require('express');
const app = express();
const router = express.Router();
const { auth } = require('../../../middleware/auth');
const { User } = require('../../../models/User');
const dev = require('../../../config/dev');
const axios = require('axios');

router.get('/', auth, (req, res) => {
  try{
    User.findOne({ token: req.token }, (err, user) => {
      if (err) return res.json({ success: false, err });
      //토큰 복호화
      user.token = '';
      user.save((err,user)=>{
        if(err) return res.json({ success: false, err });
      })
      if(req.cookies.x_auth_type === 'kakao')
      {
        console.log(req.cookies.x_auth_type);
        const url = `https://kauth.kakao.com/oauth/logout?client_id=${dev.kakao_REST_API}&logout_redirect_uri=${dev.client_URL}`;
        axios.get(url);
      }
      return res.status(200).send({
        success: true,
      });
    });
  } catch(err) {
    return res.json({success: false, err});
  }
});

module.exports = router;
