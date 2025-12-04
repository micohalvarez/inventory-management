import axios from 'axios';

// const baseURL = 'http://127.0.0.1:3000/api/v1/';

// const INTERNAL_BASE_URL = 'http://merged-inventory-django-1:5000/api/v1';
const INTERNAL_BASE_URL = process.env.INTERNAL_DJANGO_URL;

const BASE_URL = INTERNAL_BASE_URL || '/api/v1/';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

instance.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
instance.defaults.headers.put['Content-Type'] =
  'application/x-www-form-urlencoded';

instance.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    if (typeof error.response === 'undefined') {
      return null;
    } else if (
      error.response.status === 401 ||
      error.response.status === 403 ||
      error.response.status === 404
    ) {
      return error;
    } else if (error.response.status === 400) {
      return error.response;
    }
    try {
      console.log(error)
      return error;
    } catch (e) {
      return e;
    }
  }
);

export default instance;
