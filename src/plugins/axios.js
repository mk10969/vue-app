import Vue from 'vue'

// Lib imports
import axios from 'axios'
// https://github.com/axios/axios

// cors
axios.defaults.withCredentials=true;
// interceptor
axios.interceptors.response.use(function (response) {
  return response;
  }, function (error) {
    console.log('API接続エラーです。');
  // 認証エラー時の処理
  if (error.response.status === 401) {
    console.log('認証エラーです。', error);
  // システムエラー時の処理
  } else if (error.response.status === 500) {
    console.log('500エラーです。', error)
  }
  return Promise.reject(error)
})

Vue.prototype.$http = axios

