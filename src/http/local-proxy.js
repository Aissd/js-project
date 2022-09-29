// 自定义一定要以/api-开头
export const PROXY_STATUS = {
  TEST: '/api-test', // 测试
  PRE: '/api-pre', // 堡垒
  PROD: '/api-prod', // 正式
};

export const createProxy = () => {
  const opt = {
    // #ifdef H5
    '/api-test': 'https://food.deeptel.com.cn/admin', // 测试
    '/api-pre': 'https://nbfood.deeptel.com.cn/admin', // 堡垒
    '/api-prod': 'https://canyin.duofriend.com/admin', // 正式
    // #endif
    // // #ifdef MP-WEIXIN
    // '/api-test': 'https://food.deeptel.com.cn', // 测试
    // '/api-pre': 'https://nbfood.deeptel.com.cn', // 堡垒
    // '/api-prod': 'https://canyin.duofriend.com', // 正式
    // // #endif
  };
  const result = {};
  for (const [key, value] of Object.entries(opt)) {
    result[key] = {
        target: value,
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^(\/api-.*?\/)/, '/')
        },
    };
  }
  return result;
};

export const localUrl = PROXY_STATUS.TEST;