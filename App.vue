 <script>
import {
mapState,
mapMutations
} from 'vuex';
import Api from './api/index'
import helper from './utils/helper'

// #ifdef APP-PLUS
import push from './utils/push.js'
// #endif

import config from './config/index.js'
import APPUpdate from '@/utils/APPUpdate.js'
import store from './store/index.js'



// #ifdef APP-PLUS
	var signAuthModule=uni.requireNativePlugin("SignAuthModule");
	
// #endif



export default {
	methods: {
		...mapMutations(['login','updateSysConfig']),
	},
	computed: {
	},
	onLaunch: function(option) {
	
		
		//获取配置信息
		if(config.env=='dev'){
			this.updateSysConfig();
			let token=this.$cache.get('token');
			console.log(token)
			if(token){
				this.login(token);
				this.updateUserInfo();
			}
		}
		
		//自动登录
		
		
		let that = this;
		// #ifdef APP-PLUS
		/* 5+环境锁定屏幕方向 */
		plus.screen.lockOrientation('portrait-primary'); //锁定
		
		if(config.env=='prod'){
		  let numType=signAuthModule.getNumType();
		  this.$cache.put("numType",numType);
		  this.updateNumType(numType);
		  this.getDeviceInfo();
		}
		
		
		//app检测更新
		// APPUpdate();
		//设置推送
		push.init();
		
		
	
		// #endif
		
	
		
	
	},
	onShow: function() {
		
	},
	onHide: function() {
		//console.log('App Hide')
	},
	onError: function(err) {
		//全局错误监听
		// #ifdef APP-PLUS
		plus.runtime.getProperty(plus.runtime.appid, widgetInfo => {
			const res = uni.getSystemInfoSync();
			let errMsg = `手机品牌：${res.brand}；手机型号：${res.model}；操作系统版本：${res.system}；客户端平台：${res.platform}；错误描述：${err}`;
			console.log('发生错误：' + errMsg);
		});
		// #endif
	}
};
</script>

<style lang='scss'>
@import "uview-ui/index.scss";
@import './common/common.scss';
@import './common/iconfont/iconfont.css';	


@import url("./static/css/common.css");
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */


</style>
