const axios = require('axios');
const dev = require('../../config/dev');

const getToken = async (code) => {
    const url = 'https://kauth.kakao.com/oauth/token';
    const params = {
        grant_type: 'authorization_code',
        client_id: dev.kakao_REST_API,
        redirect_uri: dev.kakao_REDIRECT_URI,
        code,
    };
    try {
      const response = await axios.post(url, null, {
        params,
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      });
      return encodeURIComponent(response['data']['access_token']);
    } catch (err) {
       console.error(err);
    }
}

const getKakaoInfo = async (req) => {
  const url = 'https://kapi.kakao.com/v1/user/access_token_info';
  try {
    const email = await axios.get(url,{
      headers: {
          Authorization: `Bearer ${req}`,
      },
  });
    return email['data']['id'];
  } catch (err) {
    console.error(err);
  }
};


module.exports = {
  getToken,
  getKakaoInfo,
};