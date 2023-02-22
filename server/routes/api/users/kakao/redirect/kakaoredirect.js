const express = require('express');
const router = express.Router();
const { User } = require('../../../../../models/User');
const kakaomodel = require('../../../../../models/Kakao/LoginModel');
const axios = require('axios');
const dev = require('../../../../../config/dev');

router.get('/', async(req,res) => {
    const code = req.query.code;
    const token= await kakaomodel.getToken(code); //카카오 인가코드 및 토큰 발행 처리 함수
    const email = await kakaomodel.getKakaoInfo(token);
    User.findOne( {email: email}, (err,user) => {
        if (!user) {
          user = new User({
            email: email,
            password: email,
            name: email,
          });
          user.save();
        } //카카오 유저에 대한 정보 db에서 찾아봐서 없으면 만들고 기존 정보가 있으면 그걸로 토큰 생성
        
        user.token= encodeURIComponent(token['data']['access_token']);
        console.log("old: "+user._id);
        console.log("old: "+user.token);
        console.log("old: "+token['data']['access_token']);
        user.save();
        res
          .cookie('x_auth', user.token)
          .cookie('x_auth_type', 'kakao')
          .status(200)
          .redirect(dev.client_URL);
      });
})

module.exports = router;