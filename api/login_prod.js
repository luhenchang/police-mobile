import request from './request_prod.js';
import store from '@/store/index.js';

export default {
	
	loginByUserName(params){
		
		
		return request({
			FFBS:'FUN001',
			data:{
				"method":"login",
				"params":params
			}
		});
	},
	
	getConfigKey(configKey) {
	  params=params || {};
	  params.accessToken='Bearer '+store.state.token;
	  return request({
	  	FFBS:'FUN004',
	  	data:{
	  		"method":"configKey",
	  		"params":params
	  	}
	  });
	},
	getConfigList(params) {
	  params=params || {};
	  params.accessToken='Bearer '+store.state.token;
	  return request({
	  	FFBS:'FUN005',
	  	data:{
	  		"method":"configList",
	  		"params":params
	  	}
	  });
	},
	
	logout() {
	  params=params || {};
	  params.accessToken='Bearer '+store.state.token;
	  return request({
	  	FFBS:'FUN002',
	  	data:{
	  		"method":"logout",
	  		"params":params
	  	}
	  });
	},
	
}