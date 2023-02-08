var express = require('express');
var router = express.Router();
const db = require('./../db');

router.get('/', (req, res) => {
    db.getAllhome((rows) => {
      res.render('main', { rows: rows });
    });
  }); //db에 있는 쿼리문 전송 함수 호출

module.exports = router;