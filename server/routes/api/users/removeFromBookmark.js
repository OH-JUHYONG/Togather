const express = require('express');
const router = express.Router();
const { auth } = require('../../../middleware/auth');
const { User } = require('../../../models/User');
const { PostPage } = require('../../../models/PostPage');

// bookmark에 있는 글 지우기
router.get('/', auth, (req, res) => {
  // 먼저 bookmark 안에 내가 지우려고 한 글을 지워주기

  console.log(req.user._id);

  User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { bookmark: { id: req.query.id } } },
    { new: true },
    (err, userInfo) => {
      let bookmark = userInfo.bookmark;
      let array = bookmark.map((item) => {
        return item.id;
      });

      // postpage collection에서 현재 남아있는 글 정볼를 가져오기
      PostPage.find({ _id: { $in: array } })
        .populate('writer')
        .exec((err, postpageInfo) => {
          return res.status(200).json({
            postpageInfo,
            bookmark,
          });
        });
    },
  );
});

module.exports = router;
