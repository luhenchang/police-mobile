import request from './request';

export default {
	login(params){
		return request({
			url:'/login',
			method:'POST',
			params:params,
		});
	},
	loginByUserName(params){
		
		return request({
			url:'/api/common/login',
			method:'POST',
			params:params,
		});
	},
	register(params) {
	  return request({
	    url: '/api/common/register',
	    headers: {
	      isToken: false
	    },
	    method: 'POST',
	    params: params
	  })
	},
	getConfigKey(configKey) {
	  return request({
	    url: '/api/common/configKey',
	    method: 'GET',
		params: {configKey}
	  })
	},
	getConfigList(params) {
	  return request({
	    url: '/api/common/configList',
	    method: 'GET',
		params: params
	  })
	},
	//下载oss对象
	downOss(params) {
	  return request({
	    url: '/api/common/download',
	    method: 'GET',
		params: params
	  })
	},
	logout() {
	  return request({
	    url: '/logout',
	    method: 'post'
	  })
	},
	
}