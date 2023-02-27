const express = require('express');
const router = express.Router();
const { auth } = require('../../../middleware/auth');
const { User } = require('../../../models/User');
const { PostPage } = require('../../../models/PostPage');

router.post('/', auth, (req, res) => {
  // 먼저 User Collection에 해당 유저의 정보를 가져오기

  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    let duplicate = false;
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

// bookmark에 있는 글 지우기
// router.get('/removeFromBookmark', auth, (req, res) => {
//   // 먼저 bookmark 안에 내가 지우려고 한 글을 지워주기

//   console.log(req.user._id);
//   User.findOneAndUpdate(
//     { _id: req.user._id },
//     { $pull: { bookmark: req.query.id } },
//     { new: true },
//     (err, userInfo) => {
//       let bookmark = userInfo.bookmark;
//       let array = bookmark.map((item) => {
//         return item.id;
//       });

//       // postpage collection에서 현재 남아있는 글 정볼를 가져오기
//       PostPage.find({ _id: { $in: array } })
//         .populate('writer')
//         .exec((err, postpageInfo) => {
//           return res.status(200).json({
//             postpageInfo,
//             bookmark,
//           });
//         });
//     },
//   );
// });

module.exports = router;
