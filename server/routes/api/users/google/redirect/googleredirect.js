const express = require('express');
const router = express.Router();
const google = require('../../../../../models/Google/LoginModel');
const { User } = require('../../../../../models/User');
const dev = require('../../../../../config/dev');

router.get('/', async(req,res) => {
    const code = req.query.code;
    const token = await google.getToken(code);
    const email = await google.getGoogleInfo(token);

    console.log(email);

    User.findOne( {email: email}, (err,user) => {
        if (!user) {
          user = new User({
            email: email,
            password: email,
            name: email,
          });
          user.save();
        } //카카오 유저에 대한 정보 db에서 찾아봐서 없으면 만들고 기존 정보가 있으면 그걸로 토큰 생성
    
        user.token= token;
        user.save();
        res
          .cookie('x_auth', user.token)
          .cookie('x_auth_type', 'google')
          .status(200)
          .redirect(dev.client_URL);
      });

})

module.exports = router;