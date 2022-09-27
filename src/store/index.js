import { defineStore } from 'pinia';

const uniLocalStorage = {
    setState(key, value) {
        console.log(key, value);
        uni.setStorageSync(key, value)
    },
    getState(key) {
        uni.getStorageSync(key)
    }
};

export const useMainStore = defineStore('indexStore', {
    state: () => {
        return {
            counter: 0,
            name: '',
            accessToken: '',
        }
    },
    // #ifdef H5
    // persist: true, // 开启持久化【所有数据】
    persist: {
        enabled: true,
        key: 'storekey',
        storage: localStorage,
        paths: ['name', 'accessToken'],
    },
    // #endif
    // #ifdef MP-WEIXIN
    persist: {
        enabled: true,
        strategies: [
            {
                storage: uniLocalStorage,
                paths: ['name', 'accessToken'],
            }
        ],
    },
    // #endif
    getters: {
        doubleCount: (state) => state.counter * 2,
    },
    actions: {
        setState(key, value) {
            console.log('setState', key, value);
            this[key] = value;
        },
        setToken(token) {
            this.accessToken = token;
        },
    },
});