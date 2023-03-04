const express = require('express');
const router = express.Router();
const { PostPage } = require('../../../models/PostPage');

router.post('/', (req, res) => {
  // 받아온 정보를 DB에 넣어준다.
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

  let term = req.body.searchTerm;

  let findArgs = {};
  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      findArgs[key] = req.body.filters[key];
    }
  }
  console.log('findArgs', findArgs);
  if (term) {
    PostPage.find(findArgs)
      .find({ $text: { $search: term } }) // 몽고DB에 접근하기 위한 코드
      .populate('writer')
      .skip(skip)
      .limit(limit)
      .exec((err, postpageinfo) => {
        if (err)
          return res.status(400).json({
            success: false,
            err,
          });
        return res.status(200).json({
          success: true,
          postpageinfo,
          postSize: postpageinfo.length,
        });
      });
  } else {
    PostPage.find(findArgs)
      .populate('writer')
      .skip(skip)
      .limit(limit)
      .exec((err, postpageinfo) => {
        if (err)
          return res.status(400).json({
            success: false,
            err,
          });
        return res.status(200).json({
          success: true,
          postpageinfo,
          postSize: postpageinfo.length,
        });
      });
  }
});

router.get('/postpage_by_id', (req, res) => {
  // query(` `)를 이용해서 정보를 가져올때는 body가 아닌 query이다.
  let type = req.query.type;
  let postpageIds = req.query.id;

  if (type === 'array') {
    // id = 124321546, 213534242, 125466 이거를
    // postpageIds = ['124321546', '213534242', '125466'] 이런식으로 바꿔주기

    let ids = req.query.id.split(',');
    postpageIds = ids.map((item) => {
      return item;
    });
  }

  console.log('postpageIds', postpageIds);

  // postpageID를 이용해서 DB에서 postpageID와 같은 게시글의 정보를 가져온다.

  PostPage.find({ _id: { $in: postpageIds } })
    .populate('writer')
    .exec((err, postpageInfo) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(postpageInfo);
    });
});

router.post('/postpage/aggregate', (req, res) => {
  const selectNum = req.body['m_category_Num'];
  const tagarr = ['dumy', 'divison', 'competition', 'field'];
  PostPage.aggregate(
    [
      { $match: { m_category_Num: selectNum } },
      {
        $group: {
          _id: '$' + tagarr[selectNum],
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ],
    [],
    async (err, postInfo) => {
      if (err) return res.json({ success: false, err });
      return res.json(postInfo);
    },
  );
});

module.exports = router;
