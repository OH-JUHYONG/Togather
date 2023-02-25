import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_BOOKMARK,
} from '../_actions/types';

export default function foo(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };

    case REGISTER_USER:
      return { ...state, register: action.payload };

    case AUTH_USER:
      return { ...state, userData: action.payload };

    case LOGOUT_USER:
      return { ...state };

    case ADD_TO_BOOKMARK:
      return {
        ...state,
        userData: {
          ...state.userData,
          bookmark: action.payload,
        },
      };
    default:
      return state;
  }
}
