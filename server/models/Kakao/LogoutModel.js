const axios = require('axios');

const KakaoLogout = async(req) => {
    try {
    if(req.x_auth_type === 'kakao')
      {
        const url = `https://kapi.kakao.com/v1/user/logout`;
        await axios.post(url,{},{
          headers: {
              Authorization: `Bearer ${req.x_auth}`,
          }
        });
    }} catch (err) { console.log(err); }
}

module.exports = {
    KakaoLogout,
  }