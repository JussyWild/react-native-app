import { sendPostRequestAsync } from '../helpers/sendRequest';

export function confirmVerifyCode(code, token) {
  const url = 'http://api.challenge.limpid-soft.ru/verify/confirm';

  return sendPostRequestAsync(url, 'POST', { code, token });
}

export function createVerifyToken(phoneNumber) {
  const verifyToken = { telephone: phoneNumber.replace(/\D+/g, '') };
  const url = 'http://api.challenge.limpid-soft.ru/verify/create';

  return sendPostRequestAsync(url, 'POST', verifyToken);
}
