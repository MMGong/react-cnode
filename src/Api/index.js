import axios from 'axios';
import message from '../Components/Toast';
import apiConfigs from './config';

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  message.error(error.response.data.error_msg);
  return Promise.reject(error);
});

function apis(name, params, options) {
  return new Promise((resolve, reject) => {
    const config = apiConfigs[name];
    if (!config) {
      throw new Error(`请在Api/config.js中配置${name}方法`);
    }
    const prePath = `${config.host}${config.path}`;
    const url = options ? `${prePath}${options.pathExtra}` : `${prePath}`;
    if (options && options.pathExtra) {
      delete options.pathExtra;
    }
    axios({
      method: config.type,
      url: url,
      params: config.type === 'get' ? params : {},
      data: ['put', 'post', 'patch'].includes(config.type) ? params : {},
      ...options,
    }).then((data) => {
      if (data && data.data && data.data.success) {
        resolve(data.data);
      } else {
        reject(new Error(data.data.error_msg));
      }
    }).catch((error) => {
      reject(error);
    });
  }).catch((error) => {
    console.error('接口请求错误:', error, error.message);
    return error;
  });
}

export default apis;
