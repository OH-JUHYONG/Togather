import axios from "axios";
import { LOGIN_USER } from "./types";

export function loginUser(dataToSubmit) {
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function kakaoLogin() {
  return {};
} //카카오 버튼 이벤트 발생시(클릭시) 처리하는 함수(단순하게 세부구현 백엔드에게 요청할 예정)