const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');

app.set('port', process.env.PORT || 5000);

// application/x-www-form-urlencoded  <-- 이런 데이터를 분석
app.use(bodyParser.urlencoded({ extended: true }));

// application/json <-- json 형태를 분석
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', indexRouter); // 루트 경로를 index.js가 사용하도록 만들어줌

app.use((req, res, next) => {
  res.status(404).send('Wrong Adress');
});

app.listen(app.get('port'), () => {
  console.log(`Example app listening on port`, app.get('port'));
});
