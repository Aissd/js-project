// import { http } from '@/http/index';
// console.log('http', http);

// const request = ({ get, post, del, put, baseURL }) => ({
//     baseURL,
//     fastFoodAndCla: (params) => get('/fast-arr/v1/foodAndCla/list', params),
//     // xyyyxx: (params) => post('', params),
// });

// export default { request };

export default {
    fastFoodAndCla(params) {
        console.log('uni.$u', uni.$u);
        return uni.$u.http.get('/admin/fast-arr/v1/foodAndCla/list', params)
    }
};
