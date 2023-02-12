const express = require("express");
const router = express.Router();
const {auth} = require("../../../middleware/auth");
const {User} = require("../../../models/User");

router.get('/', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});
  
module.exports = router;