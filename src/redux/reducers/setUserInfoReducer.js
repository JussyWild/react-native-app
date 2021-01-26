import {
  SET_PHONE,
  SET_EMAIL,
  SET_NICKNAME,
  SET_BIRTH_DATE,
  SET_PASSWORD,
  SET_VERIFY_TOKEN,
} from '../types';

const initialState = {
  phone: '',
  email: '',
  nickname: '',
  birthDate: '',
  password: '',
  verifyToken: '',
};

export function setUserInfoReducer(state = initialState, action) {
  if (action.type === SET_PHONE) {
    return { ...state, phone: action.phone };
  } else if (action.type === SET_EMAIL) {
    return { ...state, email: action.email };
  } else if (action.type === SET_NICKNAME) {
    return { ...state, nickname: action.nickname };
  } else if (action.type === SET_BIRTH_DATE) {
    return { ...state, birthDate: action.birthDate };
  } else if (action.type === SET_PASSWORD) {
    return { ...state, password: action.password };
  } else if (action.type === SET_VERIFY_TOKEN) {
    return { ...state, verifyToken: action.verifyToken };
  }

  return state;
}
