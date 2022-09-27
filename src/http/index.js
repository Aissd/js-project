import api from './api';
import config from './config';

let http = {};

const install = (Vue, vm) => {
    const baseURL = config.set(Vue, vm);
    const methods = {
        get: vm.$u.get,
        post: vm.$u.post,
        del: vm.$u.delete,
        put: vm.$u.put,
        baseURL,
    };
    http = api.request(methods);
    Vue.prototype.$api = api.request(methods);
};

export { http };
export default { install };