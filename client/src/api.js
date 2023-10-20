import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const API = axios.create({
  baseURL: API_BASE_URL,
});

/*
 * Setting interceptors to be able
 * to know the response time of each request
 */
API.interceptors.request.use(
  (config) => {
    const newConfig = { ...config };
    newConfig.metadata = { startTime: new Date() };
    return newConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    const newRes = { ...response };
    newRes.config.metadata.endTime = new Date();
    newRes.duration =
      newRes.config.metadata.endTime - newRes.config.metadata.startTime;
    return newRes;
  },
  (error) => {
    const newError = { ...error };
    newError.config.metadata.endTime = new Date();
    newError.duration =
      newError.config.metadata.endTime - newError.config.metadata.startTime;
    return Promise.reject(newError);
  }
);

export default API;
