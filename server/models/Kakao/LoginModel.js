const axios = require('axios');
const dev = require('../../config/dev');

const kakaoLogin = async (code) => {
  try {
    const access_token = await getToken(code); //인가코드를 통해 토큰을 받아옴
    const email = await getKakaoInfo(access_token); //토큰을 이용해서 카톡 사용자 정보 받아옴
    return email;
  } catch (err) {
    code.throw(500, err);
  }
  };

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
      return response;
    } catch (err) {
       console.error(err);
    }
}

const getKakaoInfo = async (req) => {
  const token = encodeURIComponent(req['data']['access_token']); //토큰 요청할때 kapi에서 인코더문제가 있어서 추가
  const url = 'https://kapi.kakao.com/v1/user/access_token_info';
  try {
    const email = await axios.get(url,{
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });
    return email['data']['id'];
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  kakaoLogin,
};