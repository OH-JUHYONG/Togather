import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

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
    <div className="registerpage-body">
      <form className="registerpage-body_form" onSubmit={onSubmitHandler}>
        <h1>Sign Up</h1>
        <input
          type="text"
          value={Name}
          onChange={onNameHandler}
          placeholder="Name"
        />
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
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
          placeholder="Confirm your password"
        />
        <br />
        <button className="registerpage-body_button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
