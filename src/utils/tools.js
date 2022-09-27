/**
 * 从url中取对应的参数
 * @param url 取参数的url
 * @param name 要取的参数名
 */
 export const getQueryParams = (url, name) => {
	if (url.indexOf('?') > -1) {
		const params = url.split('?')[1];
		const reg = new RegExp('(^|&|;)' + name + '=([^&|;]*)(&|;|$)', 'i');
		const result = params.match(reg);
		if (result !== null) {
			return result[2];
		}
	}
	return null;
};

// 手机号脱敏
export const mobileEncrypt = (val) => {
	if (!val) return '';
	return val.replace(/(\d{3})\d*(\d{4})/, '$1****$2');
};