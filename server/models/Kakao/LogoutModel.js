const axios = require('axios');
const dev = require('../../config/dev');

const kakaoLogout = async () => {
  const url = `https://kauth.kakao.com//oauth/logout?client_id=${dev.kakao_REST_API}&logout_redirect_uri=${dev.client_URL}`;
  await axios.get(url);
}

module.exports = {
  kakaoLogout,
};