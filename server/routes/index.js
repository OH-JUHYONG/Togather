const express = require('express');
const router = express.Router();
const config = require('../config/key');
const apiRouter = require('./api/api'); // api.js로 가기위한 미들웨어 장착

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose
  .connect(config.mongoURI, {})
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err)); // 에러가 발생할 경우 어떤 에러가 발생하는지 알 수 있는 코드

router.get('/', (req, res) => {
  res.send('Hello World!!!');
});

router.use('/api', apiRouter); // routes/api폴더의 api.js에서 페이지 미들웨어역할 수행

module.exports = router;

//라우터로 로그인 관련 파일 나눠놓음에 따라서 import USER부분은 각 api/users폴더 내 파일에 있음
//각 URI별로 구현부분을 파일로 나누고 라우터로 연결하여 코드 길이 절약 및 파일 가독성 보완
