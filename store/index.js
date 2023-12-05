import Vue from 'vue'
import Vuex from 'vuex'
import cache from '../utils/cache'
import helper from '../utils/helper'
import Api from '../api/index'
import config from '@/config/index.js'
// import CIMPushManager from '@/utils/cim/cim.web.sdk.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		token:'',
		sysConfig:{},
		currentCity:'',
		curPosition:{},
		tempColor: '#2FC97C',
		tempColorRbg:{r:0,g:198,b:87},
		userInfo: {},
		personDevice:{},
		roles:[],
		role:{},
		userId:'',
		policeTab:0,
		inviteCode:'',
		numType:'',
		imei:"",
		deviceUser:{}
	},
	mutations: {
		login(state, token) {
			state.hasLogin = true;
			state.token=token;
			cache.put('token',token);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			state.token='';
			cache.remove('userInfo');
			cache.remove('token');
			cache.remove("userId");
			cache.remove("hasConnect");
			if(config.env=='prod'){
				// #ifdef APP-PLUS
				plus.runtime.quit();
				// #endif
			}else{
				uni.navigateTo({
					url:'/pages/auth/login/login'
				})
			}
			
		},
		updateDeviceUser(state,user){
			state.deviceUser=user;
		},
		updateUserInfo(state){
			console.log("更新用户信息")
			Api.getUserInfo().then(data=>{
				console.log(data)
				if(data.user.roles.length >0){
					let roleName='';
					data.user.roles.forEach(item=>{
						roleName += ' '+item.roleName;
					})
					data.user.roleName=roleName;
				}
				state.userInfo=data.user;
				state.personDevice=data.personDevice ||{};
				state.roles=data.roles;
				state.userId=data.user.userId;
				console.log(data.user.userId)
				cache.put('userId',data.user.userId+'');
				// if(config.env=='dev'){
				// 	CIMPushManager.connect();
				// }
				
				let role={};
				if(data.roles.indexOf('banan') >-1){
					role.banan=true;
				}
				if(data.roles.indexOf('anguan') >-1){
					role.anguan=true;
				}
				if(data.roles.indexOf('daji') >-1){
					role.daji=true;
				}
				if(data.roles.indexOf('fenju') >-1){
					role.fenju=true;
				}
				state.role=role;
				console.log(state.role);
			})
		},
		clearUserInfo(state){
			state.hasLogin = false;
			state.userInfo = {};
			cache.remove('userInfo');
		},
		updateNumType(state,numType){
			state.numType=numType;
		},
		updateInviteCode(state,inviteCode){
			state.inviteCode=inviteCode;
			cache.put('inviteCode',inviteCode);
		},
		updatePoliceTab(state,policeTab){
			state.policeTab=policeTab;
		},
		updateSysConfig(state){
			//获取配置信息
			let params={
				configType:'N',
			}
			Api.getConfigList(params).then(data=>{
				let sysConfig={};
				data.forEach((item)=>{
					if(item.configKey=='app.boxBgAudio' || item.configKey=='app.boxOpenAudio'){
						item.configValue=helper.getFile(item.configValue)
					}
					sysConfig[item.configKey]=item.configValue;
				})
				state.sysConfig=sysConfig;
				console.log(sysConfig)
			})
		},
		userNameLogin(state,userName){
			var formData={
			 username:userName,
			 loginType:"mobile",
			 }
			 Api.loginByUserName(formData).then(data=>{
			 state.hasLogin = true;
			 state.token=data.token;
			 cache.put('token',data.token);
			 uni.switchTab({
					url:'/pages/index/index'
				})
			 
			})
		},
		getDeviceInfo(state){
			plus.device.getInfo({
				success:function(e){
					state.imei=e.imei;
					 cache.put('imei',e.imei);
					console.log('getDeviceInfo success: '+JSON.stringify(e));
				},
				fail:function(e){
					console.log('getDeviceInfo failed: '+JSON.stringify(e));
				}
			})
		}
		
			
	},
	actions: {
	
	}
})

export default store
