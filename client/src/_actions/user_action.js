import axios from 'axios';
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_BOOKMARK,
  GET_BOOKMARK_ITEMS,
  REMOVE_BOOKMARK_ITEM,
  GITHUB_LOGIN_USER,
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
    .post(`${USER_SERVER}/bookmark`, body)
    .then((response) => response.data);

  return {
    type: ADD_TO_BOOKMARK,
    payload: request,
  };
}

export function getbookmarkItems(bookmarkItems, userBookmark) {
  const request = axios
    .get(`/api/users/postpage/postpage_by_id?id=${bookmarkItems}&type=array`) // single=>array 아닌 이유는 여러 유저 정보의 글들을 저장하기 때문
    .then((response) => {
      userBookmark.forEach((bookmarkItem) => {
        response.data.forEach((postpagedetail, index) => {
          if (bookmarkItem.id === postpagedetail._id) {
            response.data[index].quantity = bookmarkItem.quantity;
          }
        });
      });

      return response.data;
    });

  return {
    type: GET_BOOKMARK_ITEMS,
    payload: request,
  };
}

// bookmark 글 삭제
export function removeBookmarkItem(postpageId) {
  const request = axios
    .get(`/api/users/removeFromBookmark?id=${postpageId}`)
    .then((response) => {
      // postpageInfo, bookmark 정보를 조합해서  postpageDetail을 만든다
      response.data.bookmark.forEach((item) => {
        response.data.postpageInfo.forEach((postpage, index) => {
          if (item.id === postpage._id) {
            response.data.postpageInfo[index].quantity = item.quantity;
          }
        });
      });

      return response.data;
    });

  return {
    type: REMOVE_BOOKMARK_ITEM,
    payload: request,
  };
}

// ---------------밑에 부분은 action기능 필요에 의해 추가

export function socialLogin(req) {
  const request = axios
    .get(`${USER_SERVER}/${req}/login/`)
    .then((response) => response.data)
    .catch((err) => {
      alert('창을 여는 중에 오류가 발생하였습니다.');
      console.log(err);
    });
  return request;
} //팝업창을 없애고 라우터 리다이렉트로 홈으로 돌아가도록 구현