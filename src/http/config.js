import { localUrl } from './local-proxy.js';
console.log('localUrl =================== ', localUrl);

let baseURL = '';

const reqConfig = [];

// #ifdef H5
// baseURL = 'https://food.deeptel.com.cn/admin';
baseURL = localUrl;
// #endif
// #ifdef MP-WEIXIN
baseURL = 'https://applet-biz-api.deeptel.com.cn/canyin/admin';
// #endif
const set = () => {
    // 设置为json，返回后会对数据进行一次JSON.parse()
    const options = {
        baseUrl: baseURL,
        // 设置为json，返回后会对数据进行一次JSON.parse()
        dataType: 'json',
        showLoading: false, // 是否显示请求中的loading
        loadingText: '努力加载中~', // 请求loading中的文字提示
        loadingTime: 5000, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
        originalData: true, // 是否在拦截器中返回服务端的原始数据
        loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
        // 配置请求头信息
    };
    // 默认配置
    uni.$u.http.setConfig(options);
	
	// 请求拦截，配置Token等参数
	uni.$u.http.interceptor.request = (config) => {
		config.data.busId = 36;
		config.data.resId = 85822332682574;
		config.data.tabId = 85822351556635;
		config.header.busId = 36;
		config.header.resId = 85822332682574;
		config.header.latitude = 23.08464;
		config.header.longitude = 114.38257;
		// #ifdef MP-WEIXIN
		config.header.dataSource = 6;
		config.data.dataSource = 6;
		const pages = getCurrentPages();
		if (pages.length) {
		  const { route } = pages[pages.length - 1];
		  config.header.requestUrl = route;
		  config.data.requestUrl = route;
		}
		// #endif
		// #ifdef H5
		config.header.dataSource = 5;
		config.data.dataSource = 5;
		if (config.data.dataSource) {
			config.header.dataSource = config.data.dataSource;
			config.header['agent-datasource'] = config.data.dataSource;
		}
		config.header.requestUrl = window.location.href;
		config.data.requestUrl = window.location.href;
		// #endif
    	reqConfig.push({ ...config, apiUrl: config.url });
		console.log(config.url, '请求的参数：', config.data);
		return config;
	}
	
	// 响应拦截，判断状态码是否通过
	uni.$u.http.interceptor.response = (res) => {
		const req = reqConfig.shift();
		console.log(req?.apiUrl, '接口返回的值：', res.data);
		if(res.statusCode == 200) {
			const { code, data } = res.data;
			switch (code) {
				case 0:
					break;
				case 7:
					window.location.replace(data);
					break;
			}
			return res.data;
		}
		return false;
	}
};

export default { set };
