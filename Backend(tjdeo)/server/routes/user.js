var express=require("express");
var router=express.Router();

const db = require('./../db');

router.get("/",(req,res) => {
    db.getUser((rows) => {
        res.render('user', { rows: rows });
      });
});

module.exports = router;