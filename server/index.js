const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./models/User"); // 유저 정보를 가져옴
const { auth } = require("./middleware/auth");
const config = require("./config/key");

// application/x-www-form-urlencoded  <-- 이런 데이터를 분석
app.use(bodyParser.urlencoded({ extended: true }));

// application/json <-- json 형태를 분석
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require("mongoose");
const { application } = require("express");
mongoose
  .connect(config.mongoURI, {})
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err)); // 에러가 발생할 경우 어떤 에러가 발생하는지 알 수 있는 코드

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.get("/api/hello", (req, res) => {
  res.send("안녕하세요 ~ ");
});

app.post("/api/users/register", (req, res) => {
  /*
  회원 가입 할때 필요한 정보들을 client에서 가져오면
  그것들을 데이터 베이스에 넣어줌
  */
  const user = new User(req.body);

  user.save((err, userInfo) => {
    // 에러가 있다면 json 형식으로 전달 + 에러메서지도 함께 전달
    if (err) return res.json({ success: false, err });

    // status(200)은 성공했다는 의미
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/api/users//login", (req, res) => {
  // 요청된 이메일을 데이터 베이스에 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가  맞는 비밀번호인지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      // 비밀번호 까지 맞다면 토큰을 생성하기
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다.어디에? 쿠키, 로컬스토리지
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userID: user._id });
      });
    });
  });
});

// role 0: 일반유저
// role 0이 아니면 관리자
app.get("/api/users/auth", auth, (req, res) => {
  // 여기까지 middleware를 통과해 왔다는 이야기는 Authentiaction이 True라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
