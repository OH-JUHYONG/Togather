const express = require('express');
const app = express();
const router = express.Router();
const { auth } = require('../../../middleware/auth');
const { User } = require('../../../models/User');
const kakaomodel = require('../../../models/Kakao/LogoutModel');
const jwt = require('jsonwebtoken');

router.get('/', auth, (req, res) => {
  try{
    User.findOne({ _id: req.user._id }, (err, user) => {
      if (err) return res.json({ success: false, err });
      console.log(user.token);
      let decode_token =  jwt.verify(user.token,'secretToken');
      //토큰 복호화
      console.log(decode_token);
      kakaomodel.kakaoLogout(decode_token);
      user.token = '';
      user.save((err,user)=>{
        if(err) return res.json({ success: false, err });
      })
      return res.status(200).send({
        success: true,
      });
    });
  } catch(err) {
    return res.json({success: false, err});
  }
});

module.exports = router;
