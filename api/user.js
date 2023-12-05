import request from './request';

export default {
	
	updateUser(params){
		return request({
			url:'/api/user/update-user',
			method:'POST',
			params:params,
		});
	},
	// 用户密码重置
	updateUserPwd(data) {
	  return request({
	     url: '/system/user/profile/updatePwd?oldPassword='+data.oldPassword+"&newPassword="+data.newPassword,
	     method: 'put',
		 query:data,
	     params: data
	   })
	},
	 
	getUserInfo(params){
		return request({
			url:'/api/user/get-user-info',
			method:'GET',
			params:params,
		});
	},
	getUser(params){
		return request({
			url:'/api/user/get-user',
			method:'GET',
			params:params,
		});
	},
	getUserList(params){
		return request({
			url:'/api/user/list',
			method:'GET',
			params:params,
		});
	},
	getUserAllocatedList(params){
		return request({
			url:'/api/user/allocatedList',
			method:'GET',
			params:params,
		});
	},
	syncTest(params){
		return request({
			url:'/api/user/syncTest',
			method:'POST',
			params:params,
		});
	},
	
}