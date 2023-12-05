import Vue from 'vue'
import App from './App'
import store from './store'
import Api from './api/index.js'
import helper from './utils/helper.js'
import cache from './utils/cache'
import config from './config/index.js'
Vue.config.productionTip = false

import uView from "uview-ui";
Vue.use(uView);
let mpShare = require('uview-ui/libs/mixin/mpShare.js');
Vue.mixin(mpShare);

import {common} from './utils/mixin/common.js';
Vue.mixin(common);

App.mpType = 'app'


// VueI18n
import VueI18n from 'vue-i18n'

// VueI18n
Vue.use(VueI18n)

// VueI18n
// **下述代码务必放在代码 "Vue.prototype._i18n = i18n" 上方
const i18n = new VueI18n({
	// 默认语言
	locale: cache.get('locale') || 'zh-CN',
	// 引入语言文件
	messages: {
		'zh-CN': require('./common/locales/zh-CN.js').message,
		'en-US': require('./common/locales/en-US.js').message,
        'zh-HK': require('./common/locales/zh-HK.js').message
	}
})

// VueI18n
// **代码 "Vue.prototype._i18n = i18n" 务必放在上述代码的下方
Vue.prototype._i18n = i18n


const msg = (title, duration=2000, mask=false, icon='none')=>{
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

const alert = (content,title='提示')=>{
	uni.showModal({
		title: title,
		content: content,
		showCancel: false,
		cancelText: '',
		confirmText: '确定',
		success: res => {
		},
		fail: () => {},
		complete: () => {}
	});
}

const successBack = (content='提交成功',title='提示')=>{
	uni.showModal({
		title: title,
		content: content,
		showCancel: false,
		cancelText: '',
		confirmText: '确定',
		success:e => {
			if(e.confirm){
				uni.navigateBack();
			}
		},
		fail: () => {},
		complete: () => {}
	});
}


const navTo= url=>{
	if(url.indexOf('http') > -1){
		// #ifdef H5
		location.href=url;
		// #endif
		
		// #ifndef H5
		uni.navigateTo({
			url:'/pages/public/webview?url='+encodeURIComponent(url)
		})
		// #endif
	}else{
		uni.navigateTo({
			url:url
		})	
	}
}

const switchTab= url=>{
		uni.switchTab({
			url:url
		})	
}


Vue.prototype.$msg=Vue.prototype.$toast= msg;
Vue.prototype.$alert = alert;
Vue.prototype.$successBack=successBack;
Vue.prototype.navTo = navTo;
Vue.prototype.switchTab=switchTab;
Vue.prototype.Api=Api;
Vue.prototype.$helper=helper;
Vue.prototype.$cache=cache;
Vue.prototype.$config=config;
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;

const app = new Vue({
	...App
})
app.$mount()
