const express = require('express');
const router = express.Router();
const { PostPage } = require('../../../models/PostPage');

// 받아온 정보를 DB에 넣어준다.
router.post('/', (req, res) => {
  const postpage = new PostPage(req.body);
  postpage.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

// postpage collection에 들어 있는 글 정보를 가져오기
router.post('/postpages', (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  let findArgs = {};
  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      findArgs[key] = req.body.filters[key];
    }
  }
  console.log('findArgs', findArgs);

  PostPage.find(findArgs)
    .populate('writer')
    .skip(skip)
    .limit(limit)
    .exec((err, postpageinfo) => {
      if (err) return res.status(400).json({ success: false, err });
      return res
        .status(200)
        .json({ success: true, postpageinfo, postSize: postpageinfo.length });
    });
});

module.exports = router;
