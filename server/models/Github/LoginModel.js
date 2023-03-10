const axios = require('axios');
const dev = require('../../config/dev');

const getToken = async (code) => {
    const url = 'https://github.com/login/oauth/access_token';
    try {
      const response = await axios({
        method: 'post',
        url: url,
        headers: {
          accept: 'application/json',
        },
        data: {
          client_id: dev.github_Client_ID,
          client_secret: dev.github_Password,
          code: code
        }
      });
      return encodeURIComponent(response['data']['access_token']);
    } catch (err) {
       console.error(err);
    }
}

const getGithubInfo = async (req) => {
  const url = 'https://api.github.com/user';
  try {
    const email = await axios.get(url,{
      headers: {
        authorization: `token ${req}`,
      },
  });
    return email['data']['id'];
  } catch (err) {
    console.error(err);
  }
};


module.exports = {
  getToken,
  getGithubInfo,
};