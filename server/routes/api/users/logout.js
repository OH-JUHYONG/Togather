const express = require('express');
const app = express();
const router = express.Router();
const { auth } = require('../../../middleware/auth');
const { User } = require('../../../models/User');
const kakaomodel = require('../../../models/Kakao/LogoutModel');

router.get('/', auth, (req, res) => {
  try{
    kakaomodel.kakaoLogout();
    User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    });
  } catch(err) {
    return res.json({success: false, err});
  }
});

module.exports = router;
