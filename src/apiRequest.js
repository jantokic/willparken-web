import axios from 'axios'

export const api = async (url, method = 'get', data = null, headers = {}) => {
  // change url from localhost:3000 to https://seal-app-jk939.ondigitalocean.app/
  url = url.replace('http://localhost:3000', 'https://seal-app-jk939.ondigitalocean.app');
  
  const config = {
    method: method,
    url: url,
    data: data,
    headers: headers,
    withCredentials: true, // send session cookie with request
  };

  const response = await axios(config);

  const setCookie = response.headers['set-cookie'];
  
  // add Set-Cookie value as Cookie header to request headers
  if (setCookie) {
    headers['Cookie'] = setCookie[0];
  }

  return response;
};
