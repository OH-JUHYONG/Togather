const dev = require('../../config/dev');
const axios = require('axios');

const GoogleLogout = async(req) => {
  try{
    if(req.x_auth_type === 'github')
    {
      const url = `https://oauth2.googleapis.com/revoke`;
      await axios.post(url,{
        params: {
          'token': req.x_auth
        },
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      });
    }
  } catch(err) { console.log(err); }
}

module.exports = {
  GoogleLogout,
}