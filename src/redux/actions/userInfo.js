import {
  SET_PHONE,
  SET_EMAIL,
  SET_NICKNAME,
  SET_BIRTH_DATE,
  SET_PASSWORD,
  SET_VERIFY_TOKEN,
} from '../types';

export function setPhone(phone) {
  return {
    type: SET_PHONE,
    phone,
  };
}

export function setEmail(email) {
  return {
    type: SET_EMAIL,
    email,
  };
}

export function setNickname(nickname) {
  return {
    type: SET_NICKNAME,
    nickname,
  };
}

export function setBirthDate(birthDate) {
  return {
    type: SET_BIRTH_DATE,
    birthDate,
  };
}

export function setPassword(password) {
  return {
    type: SET_PASSWORD,
    password,
  };
}

export function setVerifyToken(verifyToken) {
  return {
    type: SET_VERIFY_TOKEN,
    verifyToken,
  };
}
