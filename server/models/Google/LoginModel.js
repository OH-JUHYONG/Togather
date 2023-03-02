const axios = require('axios');
const dev = require('../../config/dev');

const getToken = async (code) => {
    const url = `https://oauth2.googleapis.com/token?code=${code}&client_id=${dev.google_Client_ID}&client_secret=${dev.google_Password}&redirect_uri=http://localhost:5000/api/users/google/login/redirect&grant_type=authorization_code`;
    try {
      const response = await axios({
        method: 'post',
        url: url,
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        }
      });
      return encodeURIComponent(response['data']['access_token']);
    } catch (err) {
       console.error(err);
    }
}

const getGoogleInfo = async (req) => {
  const url = `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${req}`;
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
  getGoogleInfo,
};