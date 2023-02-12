const express = require("express");
const router = express.Router();

const authRouter = require("./users/auth");
const loginRouter = require("./users/login");
const logoutRouter = require("./users/logout");
const registerRouter = require("./users/register");
// 해당 주소로 가기위한 미들웨어 장착

router.use("/auth",authRouter);
router.use("/login",loginRouter);
router.use("/logout",logoutRouter);
router.use("/register",registerRouter);

//각 부분마다 라우터 사용

router.get("/",(req,res) => {
    res.send("This is api.js")
})
//미드웨어 동작 확인용

module.exports = router;