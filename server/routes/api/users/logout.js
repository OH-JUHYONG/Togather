const express = require('express');
const app = express();
const router = express.Router();
const { auth } = require('../../../middleware/auth');
const { User } = require('../../../models/User');
const dev = require('../../../config/dev');
const { KakaoLogout } = require('../../../models/Kakao/LogoutModel');
const { GithubLogout } = require('../../../models/Github/LogoutModel');
const { GoogleLogout } = require('../../../models/Google/LogoutModel');

router.get('/', auth, (req, res) => {
  try {
    User.findOne({ token: req.token }, async (err, user) => {
      if (err) return res.json({ success: false, err });
      //토큰 복호화
      user.token = '';
      user.save((err, user) => {
        if (err) return res.json({ success: false, err });
      });
      const socialtype = req.cookies.x_auth_type;
      if (socialtype === 'kakao') await KakaoLogout(req.cookies);
      if (socialtype === 'github') await GithubLogout(req.cookies);
      if (socialtype === 'google') await GoogleLogout(req.cookies);
      res.clearCookie('x_auth');
      res.clearCookie('x_auth_type'); //인증 쿠키 로그아웃시에 삭제
      return res.status(200).send({
        success: true,
      });
    });
  } catch (err) {
    return res.json({ success: false, err });
  }
});

module.exports = router;
