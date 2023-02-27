import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_BOOKMARK,
  GET_BOOKMARK_ITEMS,
  REMOVE_BOOKMARK_ITEM,
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

    case GET_BOOKMARK_ITEMS:
      return { ...state, postpagedetail: action.payload };

    case REMOVE_BOOKMARK_ITEM:
      return {
        ...state,
        postpagedetail: action.payload.postpageInfo,
        userData: {
          ...state.userData,
          bookmark: action.payload.bookmark,
        },
      };

    default:
      return state;
  }
}
