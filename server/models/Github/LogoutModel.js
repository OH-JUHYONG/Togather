const dev = require('../../config/dev');
const axios = require('axios');

const GithubLogout = async(req) => {
  try{
    if(req.x_auth_type === 'github')
    {
      const url = `https://api.github.com/applications/${dev.github_Client_ID}/token`;
      await axios.delete(url,{
        data: {
          access_token: req.x_auth
        },
        auth: {
          username: dev.github_Client_ID,
          password: dev.github_Password
        }
      });
    }
  } catch(err) { console.log(err); }
}

module.exports = {
  GithubLogout,
}