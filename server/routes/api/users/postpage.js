const express = require('express');
const {
  default: UploadPostPage,
} = require('../../../../client/src/components/views/UploadPostPage/UploadPostPage');
const router = express.Router();
const { auth } = require('../../../middleware/auth');
const { User } = require('../../../models/User');
const { PostPage } = require('../../../models/PostPage');

router.post('/', (req, res) => {
  // 받아온 정보를 DB에 넣어준다.

  const postpage = new PostPage(req.body);
  postpage.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

module.exports = router;
