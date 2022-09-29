import { isWxBroswer } from '@/utils/tools';

export const getLocation = () => {
    return new Promise((resolve) => {
        if (isWxBroswer()) {
            
        } else {
            // 微信H5
            uni.getLocation({
                type: 'wgs84',
                success: ({ latitude, longitude }) => {
                    console.log(latitude, longitude);
                    resolve(true);
                },
                fail: (err) => {
                    console.log('uni.getLocation', err);
                    resolve(false);
                },
            });
        }
    });
};