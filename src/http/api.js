// import { http } from '@/http/index';
// console.log('http', http);

// const request = ({ get, post, del, put, baseURL }) => ({
//     baseURL,
//     fastFoodAndCla: (params) => get('/fast-arr/v1/foodAndCla/list', params),
//     // xyyyxx: (params) => post('', params),
// });

// export default { request };

export default {
    wxjssdkInfo(params, header = {}) {
        return uni.$u.http.get('/fans/general/wxjssdk/info', params, header);
    },
    getFoodCategoryList(params, header = {}) {
        return uni.$u.http.get('/fans/general/food/category/list', params, header);
    },
    getFoodList(params, header = {}) {
        return uni.$u.http.get('/fans/general/food/list', params, header);
    },
};
