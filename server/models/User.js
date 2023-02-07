const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  // 유저이름
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // 공백을 없애주는 역할
    unique: 1, // 같은 이메일 중복 안되게 설정
  },
  password: {
    type: String,
    minlenght: 5,
    maxlength: 100,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  // 관리자인지 일반 유저인지를 구별
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  // 토큰을 통해 유효기간을 설정
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  var user = this;

  // 비밀번호를 바꿀때만 암호화 시킴, 이게 없다면 다른걸 변경할때도 암호화 됨
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    //비밀번호가 아닌 다른걸 바꿀 때는 next를 이용해 이 함수를 빠져나감
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plainPassword 1234567
  // 암호화된 비밀번호 asfbvsd1lk3t1slg;k2pp 두개를 비교해야 한다.
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;
  // jsonwebtoken을 이용해서 token을 생성하기
  var token = jwt.sign(user._id.toHexString(), "secretToken");
  //   user._id + "secretToken" = token
  //   ->
  //   "secretToken" -> user._id

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;
  // 토큰을 decode 한다.
  jwt.verify(token, "secretToken", function (err, decoded) {
    // 유저 아이디를 이용해서 유저를 찾은 다음에
    // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

// 다른 파일에서도 쓸 수 있게 export
module.exports = { User };
