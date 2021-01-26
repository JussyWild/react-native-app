export const sendPostRequestAsync = async (url, method, data = null) => {
  const headers = { 'Content-Type': 'application/json' };

  console.log({
    url,
    method,
    data,
    headers,
  });

  const response = await fetch(url, {
    method: method,
    body: method === 'GET' ? null : JSON.stringify(data),
    headers,
  });

  const responseJson = response.json();

  console.log({
    response_data: responseJson,
    response_code: response.status,
  });

  if (response.ok) {
    return responseJson;
  }

  throw new Error(response.status);
};
