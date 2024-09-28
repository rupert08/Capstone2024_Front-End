import axios from 'axios';

const API_URL = '/ecommerce/admin/';

export default {
  getAllAdmins() {
    return axios.get(`${API_URL}getAll`);
  },

  loginAdmin(loginData) {
    return axios.post(`${API_URL}login`, loginData);
  }
};
