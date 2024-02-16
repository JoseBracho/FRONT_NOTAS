import axios from 'axios';

export const login = async (userName, password) => {
  return axios.post('http://154.38.184.216:3501/auth/login', {
    userName,
    password
  });
}
