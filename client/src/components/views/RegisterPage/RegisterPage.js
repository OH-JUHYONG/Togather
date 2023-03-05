import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

import NavBar from '../NavBar/NavBar';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password.length < 5) {
      return alert('비밀번호는 5자리 이상이어야 합니다');
    }

    if (Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    }
    let body = {
      email: Email,
      password: Password,
      name: Name,
    };
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        navigate('/login');
      } else {
        alert('Failed to sign up');
      }
    });
  };

  return (
    <>
      <NavBar />
      <div className="registerpage">
        <h1 className="registerpage-form_h1">Sign Up</h1>
        <form className="registerpage-form" onSubmit={onSubmitHandler}>
          <input
            className="registerpage-form_input"
            type="text"
            value={Name}
            onChange={onNameHandler}
            placeholder="Name"
          />
          <input
            className="registerpage-form_input"
            type="email"
            value={Email}
            onChange={onEmailHandler}
            placeholder="Email"
          />
          <input
            className="registerpage-form_input"
            type="password"
            value={Password}
            onChange={onPasswordHandler}
            placeholder="Password"
          />
          <input
            className="registerpage-form_input"
            type="password"
            value={ConfirmPassword}
            onChange={onConfirmPasswordHandler}
            placeholder="Confirm your password"
          />
          <button className="registerpage-form_button" type="submit">
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default RegisterPage;
