const express = require('express');
const router = express.Router();
const { auth } = require('../../../middleware/auth');

// role 0: 일반유저
// role 0이 아니면 관리자
router.get('/', auth, (req, res) => {
  // 여기까지 middleware를 통과해 왔다는 이야기는 Authentiaction이 True라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
    bookmark: req.user.bookmark, //  다른 페이지 이동할때도 북마크 정보 저장을 위해 필요한 구문
    history: req.user.history,
  });
});

module.exports = router;
