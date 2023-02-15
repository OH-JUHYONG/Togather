import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER, KAKAO_LOGIN_USER } from './types';
import { USER_SERVER } from '../components/Config.js';

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get(`${USER_SERVER}/auth`)
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = axios
    .get(`${USER_SERVER}/logout`)
    .then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

// ---------------밑에 부분은 action기능 필요에 의해 추가

export function kakaoLogin() {
  const request = axios
    .post(`${USER_SERVER}/kakao/login`)
    .then((response) => response.data);

  return {
    type: KAKAO_LOGIN_USER,
    payload: request,
  };
}

export function kakaoKey() {
  return axios
    .get(`${USER_SERVER}/kakao/login/key`)
    .then((response) => response.data)
    .catch(err => {
      alert("창을 여는 중에 오류가 발생하였습니다.");
      console.log(err);
    });

}