const request = ({ get, post, del, put, baseURL }) => ({
    baseURL,
    xxx: (params) => get('', params),
    xyyyxx: (params) => post('', params),
});

export default { request };