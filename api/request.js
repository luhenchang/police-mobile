import config from '../config/index'
import cache from '../utils/cache'
import helper from '@/utils/helper'
import objectAssign from 'object-assign'
import store from '@/store/index.js'
 var request=async function(option){
	let url=option.url;
	if(url.indexOf('http')<=-1){
		url=config.apiHost+url;
	}

	let extraParams={
		operationSource:helper.getRuntime()
	}
	// #ifdef APP-PLUS
	extraParams.app_channel=plus.runtime.channel;
	// #endif
	let data=objectAssign(extraParams,option.params||{})
	 const isToken = (option.header || {}).isToken === false
	let header={};
	header['Content-Language'] = 'zh_CN';
	// if(store.state.token && !isToken){
	// 	// header['Authorization'] = 'Bearer ' +store.state.token
	// 	if(url.indexOf('?')>-1){
	// 		url +='&accessToken=Bearer '+store.state.token;
	// 	}else{
	// 		url +='?accessToken=Bearer '+store.state.token;
	// 	}
	// }
	data.accessToken='Bearer '+store.state.token;
	
	
	return await new Promise((resolve, reject) => {

	uni.request({
		url:url,
		data:data,
		method:option.method,
		header:header,
		success:(res)=>{
			if(res.statusCode==401){
				if(typeof option.error == 'function'){
					option.error.call(this,rs);
				}
				uni.navigateTo({
					url:'/pages/auth/login/login'
				})
				reject(rs);
			}
			uni.hideLoading();
			let rs=res.data;
			if(rs.code==200){
				if(typeof option.success == 'function'){
					option.success.call(this,rs.data);
				}	
				resolve(rs.data || rs.rows);
			}else if(rs.code==401){
				
				if(typeof option.error == 'function'){
					option.error.call(this,rs);
				}
				uni.navigateTo({
					url:'/pages/auth/login/login'
				})
				reject(rs);
			}else if(rs.code==500){
				if(url.indexOf('/login')>-1){
					uni.showModal({
						title:'提示',
						content:rs.msg,
						showCancel:false
					})
				}else{
					uni.showModal({
						title:'提示',
						content:'操作失败！',
						showCancel:false
					})
				}
				
				if(typeof option.error == 'function'){
					option.error.call(this,rs);
				}
				reject(rs);
			}else{
				if(rs.msg){
					uni.showModal({
						title:'提示',
						content:rs.msg,
						showCancel:false
					})
				}
				if(typeof option.error == 'function'){
					option.error.call(this,rs);
				}
				reject(rs);
			}
			
		},
		fail:(e)=>{
			console.log(e);
			uni.hideLoading();
			// #ifdef APP-PLUS
			
				
			// #endif
			
			reject(e);
			
		}
		
	})
	})
}

export default  request;


