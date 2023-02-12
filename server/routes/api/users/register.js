const express = require("express");
const router = express.Router();
const User = require("../../../models/User")


router.post("/api/users/register", (req, res) => {
    /*
    회원 가입 할때 필요한 정보들을 client에서 가져오면
    그것들을 데이터 베이스에 넣어줌
    */
    const user = new User(req.body);
  
    user.save((err, userInfo) => {
      // 에러가 있다면 json 형식으로 전달 + 에러메서지도 함께 전달
      if (err) return res.json({ success: false, err });
  
      // status(200)은 성공했다는 의미
      return res.status(200).json({
        success: true,
      });
    });
  });
  
  module.exports = router;