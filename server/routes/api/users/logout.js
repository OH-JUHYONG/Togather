const express = require('express');
const app = express();
const router = express.Router();
const { auth } = require('../../../middleware/auth');
const { User } = require('../../../models/User');
const dev = require('../../../config/dev');
const axios = require('axios');

router.get('/', auth, (req, res) => {
  try{
    User.findOne({ token: req.token }, async (err, user) => {
      if (err) return res.json({ success: false, err });
      //토큰 복호화
      user.token = '';
      user.save((err,user)=>{
        if(err) return res.json({ success: false, err });
      })
      if(req.cookies.x_auth_type === 'kakao')
      {
        const url = `https://kapi.kakao.com/v1/user/logout`;
        await axios.post(url,{},{
          headers: {
              Authorization: `Bearer ${req.cookies.x_auth}`,
          }
        });
      }
      res.clearCookie('x_auth');
      res.clearCookie('x_auth_type'); //인증 쿠키 로그아웃시에 삭제
      console.log(req.cookies.x_auth);
      console.log(req.cookies.x_auth_type);
      return res.status(200).send({
        success: true,
      });
    });
  } catch(err) {
    return res.json({success: false, err});
  }
});

module.exports = router;
