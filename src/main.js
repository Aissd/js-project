import { createSSRApp } from "vue";
import uView from 'vk-uview-ui';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import http from '@/http/index';

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

import App from "./App.vue";
export function createApp() {
	const app = createSSRApp(App);
	app.use(uView);
	app.use(pinia);
	app.use(http);
	return {
		app,
	};
}
