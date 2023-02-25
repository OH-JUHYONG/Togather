import axios from 'axios';
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_BOOKMARK,
} from './types';
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

// 북미크 기능
export function addToBookmark(id) {
  let body = {
    postpageId: id,
  };

  const request = axios
    .post(`${USER_SERVER}/addToBookmark`, body)
    .then((response) => response.data);

  return {
    type: ADD_TO_BOOKMARK,
    payload: request,
  };
}

// ---------------밑에 부분은 action기능 필요에 의해 추가

export function kakaoLogin() {
  const request = axios
    .get(`${USER_SERVER}/kakao/login/`)
    .then((response) => response.data)
    .catch((err) => {
      alert('창을 여는 중에 오류가 발생하였습니다.');
      console.log(err);
    });
  return request;
} //팝업창을 없애고 라우터 리다이렉트로 홈으로 돌아가도록 구현
