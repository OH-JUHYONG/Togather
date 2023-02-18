import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { kakaoLogin, loginUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';
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
    <div className="loginpage-body">
      <form className="loginpage-body_form" onSubmit={onSubmitHandler}>
        <h1>Sign In</h1>
        <div className="social-login"></div>
        <span>or use your account</span>
        <input
          type="email"
          value={Email}
          onChange={onEmailHandler}
          placeholder="Email"
        />
        <input
          type="password"
          value={Password}
          onChange={onPasswordHandler}
          placeholder="Password"
        />
        <a href="https://naver.com">Forgot your password?</a>
        <button className="loginpage-body_button" type="submit">
          Sign in
        </button>
      </form>
      <button
        type="kakao"
        onClick={() =>
          kakaoLogin().then((appdata) =>
            window.open(
              appdata,
              '_blank',
              'width=430,height=500,location=no,status=no,scrollbars=yes',
            ),
          )
        }
      >
        {' '}
        카카오 로그인{' '}
      </button>
    </div>
  );
}
// 카카오 로그인 버튼 추가
export default LoginPage;
