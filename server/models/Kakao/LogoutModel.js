const axios = require('axios');

const KakaoLogout = async(req) => {
    if(req.x_auth_type === 'kakao')
      {
        const url = `https://kapi.kakao.com/v1/user/logout`;
        await axios.post(url,{},{
          headers: {
              Authorization: `Bearer ${req.x_auth}`,
          }
        });
    }
}

module.exports = {
    KakaoLogout,
  }