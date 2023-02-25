const express = require('express');
const router = express.Router();
const { auth } = require('../../../middleware/auth');
const { User } = require('../../../models/User');

router.post('/', auth, (req, res) => {
  // 먼저 User Collection에 해당 유저의 정보를 가져오기

  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    let duplicate = false;
    console.log(duplicate);
    userInfo.bookmark.forEach((item) => {
      // 가져온 정보에서 북마크에 넣으려 하는 글이 이미 들어있는지 확인
      if (item.id === req.body.postpageId) {
        duplicate = true;
      }
    });

    // 글이 이미 있을때
    if (duplicate) {
      User.findOneAndUpdate(
        { _id: req.user._id, 'bookmark.id': req.body.postpageId },
        { $inc: { 'bookmark.$.quantity': 1 } },
        { new: true }, // 업데이트 된 정보를 받으려면 다음 조건 필요
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).send(userInfo.bookmark);
        },
      );
    }

    // 글이 있지 않을때
    else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            bookmark: {
              id: req.body.postpageId,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).send(userInfo.bookmark);
        },
      );
    }
  });
});

module.exports = router;
