const { User } = require('../models/User');

let auth = (req, res, next) => {
  // 인증 처리를 하는 곳

  // 클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookies.x_auth;
  let token_type = req.cookies.x_auth_type; //로그인 토큰 타입이 카카오토큰인지 로컬토큰인지 구별
  // 1.키키어토큰인 경우 토큰정보 그대로 유저를 찾는다.
  if(token_type === 'kakao')
  {
    User.findOne({token: token},function (err,user){
      if(err) throw err;
      if(!user) return res.json({ isAuth: false, error: true });
      req.token = token;
      req.user = user;
      next();
    })
  }
  // 2.로컬토큰인 경우 토큰을 복호화 한 후 유저를 찾는다.
  else {
    User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;
    next();
    })
  };

  // 유저가 있으면 인증 Okay

  // 유저가 없으면 인증 No !
};

module.exports = { auth };
