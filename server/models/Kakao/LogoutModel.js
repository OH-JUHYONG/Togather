const axios = require('axios');
const dev = require('../../config/dev');

const kakaoLogout = async () => {
  const url = `http://kauth.kakao.com/oauth/logout?client_id=${dev.kakao_REST_API}&logout_redirect_uri=${dev.client_URL}`;
  try{
    await axios.get(url);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  kakaoLogout,
};