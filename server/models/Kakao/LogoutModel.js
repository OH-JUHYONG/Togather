const axios = require('axios');
const dev = require('../../config/dev');

const kakaoLogout = async (req,res) => {
  if(req)
  {
    const token = encodeURIComponent(req);
    const url = `https://kapi.kakao.com/v1/user/logout`;
    await axios.create( {
        baseURL: url,
        headers: { Authorization: `Bearer ${token}`},
    })
    .post();
  }
}

module.exports = {
  kakaoLogout,
};