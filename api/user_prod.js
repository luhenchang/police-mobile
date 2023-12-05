import request from './request_prod.js';
import store from '@/store/index.js';
export default {
	
	
	getUserInfo(params){
		params=params || {};
		console.log("getUserInfo",store.state.token);
		params.accessToken='Bearer '+store.state.token;
		return request({
			FFBS:'FUN032',
			data:{
				"method":"getUserInfo",
				"params":params
			}
		});
	},
	
	getUserList(params){
		params=params || {};
		params.accessToken='Bearer '+store.state.token;
		return request({
			FFBS:'FUN033',
			data:{
				"method":"list",
				"params":params
			}
		});
	},
	getUserAllocatedList(params){
		params=params || {};
		params.accessToken='Bearer '+store.state.token;
		return request({
			FFBS:'FUN034',
			data:{
				"method":"allocatedList",
				"params":params
			}
		});
	},
	
}