import api from './api';
import config from './config';

// let http = {};

const install = (Vue) => {
    // Vue.provide('$api', api);
    // Vue.config.globalProperties.$api= api;

    config.set(Vue);
    // console.log('Vue.config.globalProperties.$u', Vue.config.globalProperties.$u);
    // const methods = {
    //     get: Vue.config.globalProperties.$u.get,
    //     post: Vue.config.globalProperties.$u.post,
    //     del: Vue.config.globalProperties.$u.delete,
    //     put: Vue.config.globalProperties.$u.put,
    //     baseURL,
    // };
    // console.log('methods', methods);
    // http = api.request(methods);
    // console.log('http', http);
    // Vue.config.globalProperties.http= http;
};

// export { http };
export default { install, ...api, };