import { sendPostRequestAsync } from '../helpers/sendRequest';

export function signUpUser(login, password, date_of_birth, verify_token) {
  const url = 'http://api.challenge.limpid-soft.ru/security/sign-up';

  return sendPostRequestAsync(url, 'POST', { login, password, date_of_birth, verify_token });
}
