import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { githubLogin, socialLogin, loginUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import kakaologo from './kakaoIcon.png';
import githublogo from './github.png';
import googlelogo from './google.png';

import './LoginPage.css';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        navigate('/');
      } else {
        alert('회원 정보가 없습니다. 다시 입력해주세요');
      }
    });
  };

  // };

  return (
    <div>
      <div className="loginpage">
        <h1 className="loginpage-form_h1">Sign In</h1>
        <div className="loginpage-social-login">
          <button
            className="loginpage-social-login_button"
            onClick={() =>
              socialLogin('kakao').then((appData) => (window.location.href = appData))
            }
          >
            {/* TODO: kakaoIcon 오류 발생 */}
            <img className="loginpage-social-login_img" src={kakaologo} alt='kaakologo'></img>
          </button>
          <button
            className="loginpage-social-login_button"
            onClick={() =>
              socialLogin('github').then((appData) => (window.location.href = appData))
            }
          >
            <img className="loginpage-social-login_img" src={githublogo} alt='githublogo'></img>
          </button>

          <button
            className="loginpage-social-login_button"
            onClick={() =>
              socialLogin('google').then((appData) => (window.location.href = appData))
            }
          >
            <img className="loginpage-social-login_img" src={googlelogo} alt='googlelogo'></img>
          </button>
        </div>
        <form className="loginpage_form" onSubmit={onSubmitHandler}>
          <span className="loginpage-form_span">or use your account</span>
          <Input
            className="loginpage-form_input"
            type="email"
            value={Email}
            onChange={onEmailHandler}
            placeholder="Email"
          />
          <Input
            className="loginpage-form_input"
            type="password"
            value={Password}
            onChange={onPasswordHandler}
            placeholder="Password"
          />
          {/*
          TODO: 유저 정보 잃어 버렸을때 찾는 방법
    
          <a className="loginpage-form_a" href="https://csai.jbnu.ac.kr">
            Forgot your password?
          </a>
           */}
          <button className="loginpage-form_button" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
// 카카오 로그인 버튼 추가
export default LoginPage;
