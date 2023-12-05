<template>
	<view class="container">
		<view class="tui-status-bar"></view>
		<!-- #ifndef MP -->
		<view class="tui-header" v-if="!isProd">
			
			<tui-icon name="shut" :size="26" @click="back"></tui-icon>
			<view class="header-title">登录</view>
		</view>
		<!-- #endif -->
		
		<view class="center logo-wrapper">
			<!-- <image class="logo" :src="sysConfig['app.logo']"></image> -->
			<image class="logo" src="../../../static/images/logo.png"></image>
			<view class="bold">案管助手</view>
		</view>
		
		<!-- #ifndef MP-WEIXIN -->
		<view class="tui-page-title">
			<text :class="{'active':isPwd}" v-if="!isProd" @click="changloginType(true)">欢迎登录</text>
			<text :class="{'active':isPwd}" v-if="isProd" >{{authTxt}}</text>
			<!-- <text :class="{'active':!isPwd}" @click="changloginType(false)">手机验证码登录</text> -->
			</view>
		
		<view class="tui-form">
			
			<view class="tui-view-input">
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent" v-if="!isProd">
					<view class="tui-cell-input">
						<tui-icon name="mobile" color="#6d7a87" :size="20"></tui-icon>
					
						<input
							:adjust-position="false"
							v-model="mobile"
							placeholder="请输入姓名/手机号"
							placeholder-class="tui-phcolor"
							type="text"
							maxlength="11"
						/>
						<view class="tui-icon-close" v-show="mobile" @click="clearInput(1)"><tui-icon name="close-fill" :size="16" color="#bfbfbf"></tui-icon></view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent" v-if="isPwd && !isProd">
					<view class="tui-cell-input">
						<tui-icon name="pwd" color="#6d7a87" :size="20"></tui-icon>
						<input
							:adjust-position="false"
							v-model="password"
							placeholder="请输入密码"
							:password="true"
							placeholder-class="tui-phcolor"
							type="text"
							maxlength="36"
						/>
						<view class="tui-icon-close" v-show="password" @click="clearInput(2)"><tui-icon name="close-fill" :size="16" color="#bfbfbf"></tui-icon></view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" v-if="!isPwd" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="shield" color="#6d7a87" :size="20"></tui-icon>
						<input placeholder="请输入验证码" v-model="code" placeholder-class="tui-phcolor" type="text" maxlength="6"  />
						<view class="tui-btn-send" @click="sendCode" :class="{ 'tui-gray': isSend }" :hover-class="isSend ? '' : 'tui-opcity'" :hover-stay-time="150">{{ btnSendText }}</view>
					</view>
				</tui-list-cell>
			</view>
			<view class="tui-cell-text">
				<!-- <view class="tui-color-primary" hover-class="tui-opcity" :hover-stay-time="150" @click="href(1)">忘记密码？</view> -->
				<!-- <view hover-class="tui-opcity" :hover-stay-time="150">
					没有账号？
					<text class="tui-color-primary" @click="href(2)">注册</text>
				</view> -->
			</view>
			<view class="tui-btn-box" v-if="!isProd">
				<u-button  :disabled="disabled" class="mb10"  :loading="loading" type="primary" :shadow="true" shape="circle" @click="userLogin">登录</u-button>
				<!-- <u-button  plain type="primary" :shadow="true" shape="circle" @click="navToRegister">注册</u-button> -->
			</view>
			<!-- #ifdef APP-PLUS -->
			<view class="tui-btn-box" v-else>
				<u-button   class="mb10"  v-if="authResult==0" type="primary" :shadow="true" shape="circle" @click="back">进入APP</u-button>
				<u-button   class="mb10"  v-if="authResult==-1" type="error" :shadow="true" shape="circle" @click="quit">退出APP</u-button>
			</view>
					
			<!-- #endif -->
			
		
		</view>
		
		<!-- #endif -->
		
	
		 <xui-footer :isFixed="false"></xui-footer>
		 
		
	</view>
</template>

<script>
import { mapMutations,mapState } from 'vuex';

// #ifdef APP-PLUS
	var signAuthModule=uni.requireNativePlugin("SignAuthModule");
	var globalEvent = uni.requireNativePlugin('globalEvent');
	
// #endif


import config from '@/config/index.js'
export default {
	computed: {
		...mapState(['sysConfig']),
		disabled: function() {
			let bool = true;
			if (this.mobile) {
				bool = false;
			}
			return bool;
		}
	},
	data() {
		return {
			mobile: '',
			password: '',
			popupShow: true,
			iosOnline:false,
			loading:false,
			isPwd:true,
			code: '',
			isSend: false,
			timer:null,
			time:0,
			authTxt:"应用认证中...",
			authResult:1,
			isProd:config.env=='prod',
			btnSendText: '获取验证码' //倒计时格式：(60秒)
		};
	},
	onLoad(options) {
		console.log(config.env);
		// #ifdef APP-PLUS
		if(config.env=='prod'){
			this.gotoAuth();
		}
		let self=this;
		globalEvent.addEventListener('appAuthEvent', function(e) {
		  // console.log('appAuthEvent',e);
		 //  uni.showModal({
		 //  	title:"应用认证",
			// content:JSON.stringify(e),
			// showCancel:false
		 //  })
		  let result=e.result;
		  let userCredential;
		  if(typeof result =='string'){
			  result=JSON.parse(result);
		  }
		  console.log(result);
		  // self.authResult=result.resultCode;
		  if(result.userCredential){
			  self.authResult=0;
			  self.authTxt="应用认证成功！";
			   userCredential=result.userCredential;
			  if(typeof(userCredential)=='string'){
				  // console.log(userCredential);
				  // userCredential=userCredential.replace(/\\/g,'');
				  userCredential=JSON.parse(userCredential);
			  }
		  }else{
			  elf.authResult=-1;
			  self.authTxt="应用认证失败！";
		  }
		  console.log(userCredential);
		  if(userCredential.credential && userCredential.credential.load && userCredential.credential.load.userInfo && userCredential.credential.load.userInfo.jh){
			  let userInfo=userCredential.credential.load.userInfo;
			  let userName=userInfo.sfzh;
			  if(!userName){
				  userName=userInfo.jh;
			  }
			  if(!userName){
				   uni.showModal({
				   	title:"应用认证失败",
				  	content:"未获取到设备的警号或身份证号",
				  	showCancel:false
				   })
				   return ;
			  }
			  
			  self.$cache.put("deviceUser",userInfo);
			  self.updateDeviceUser(userCredential.credential.load.userInfo);
			  // if(userName=='code'){
				 //  userName=userInfo.sfzh;
			  // }
			  self.loginByUserName(userName);
		  }
		});
		// #endif
	},
	methods: {
		gotoAuth(){
			//应用认证
			signAuthModule.gotoAuthPage();
		},
		changloginType(isPwd){
			this.isPwd=isPwd
		},
		back() {
			uni.switchTab({
				url:'/pages/index/index'
			})
		},
		quit(){
			plus.runtime.quit();
		},
		navToRegister(){
		   uni.navigateTo({
		   	url:'/pages/auth/reg/reg'
		   })	
		},
		inputMobile: function(e) {
			this.mobile = e.detail.value;
		},
		inputPwd: function(e) {
			this.password = e.detail.value;
		},
		inputCode(e) {
			this.code = e.detail.value;
		},
		startTimer(){
			this.time=60;
			let self=this;
			this.timer=setInterval(function(){
				self.time--;
				self.btnSendText=self.time+'S后重新发送';
				if(self.time<=0){
					clearInterval(self.timer);
					self.btnSendText="重新发送";
					self.isSend=false;
				}
			},1000);
		},
		sendCode(){
			if(!this.mobile){
				this.$toast('请输入手机号');
				return ;
			}
			this.Api.sendCode({mobile:this.mobile}).then(data=>{
				this.$toast('发送成功，请注意查收！');
				 this.time=60;
				 this.isSend=true;
				 this.startTimer()
			})
		},
		clearInput(type) {
			if (type == 1) {
				this.mobile = '';
			} else if(type==2) {
				this.password = '';
			} else{
				this.code='';
			}
		},
		href(type) {
			let url = '/pages/auth/forgetPwd/forgetPwd';
			if (type == 2) {
				url = '/pages/auth/reg/reg';
			}
			uni.navigateTo({
				url:url
			});
		},
		showOtherLogin() {
			//打开后 不再关闭
			this.popupShow = true;
		},
		userInfoLogin(e){
			let userInfo=e.target.userInfo;
			this.loginWidthUserinfo(userInfo);
		},
		loginByUserName(userName){
			var formData={
			 username:userName,
			 loginType:"mobile",
			 }
			 this.loading=true;
			 this.Api.loginByUserName(formData).then(data=>{
			 this.loading=false;
			 this.login(data.token);
			 this.updateUserInfo();
			//获取配置信息
			this.updateSysConfig();
			 uni.switchTab({
				url:'/pages/index/index'
			 })
			 
			},err=>{
				this.loading=false;
			}).finally(()=>{
				this.loading=false;
			})
		},
		pwdLogin(){
			var formData={
			 username:this.mobile,
			 password:this.password,
			 userType:"09",
			 loginType:"mobile",
			 }
			 this.loading=true;
			 this.Api.login(formData).then(data=>{
			 this.loading=false;
			 this.login(data.token);
			 this.updateUserInfo();
			 if(this.returnUrl){
				uni.navigateTo({
					url:this.returnUrl
				})
			 }
			 else{
				uni.switchTab({
					url:'/pages/index/index'
				})
			 }
			},err=>{
				this.loading=false;
			}).finally(()=>{
				this.loading=false;
			})
		},
		codeLogin(){
			var formData={
			 mobile:this.mobile,
			 verifyCode:this.code,
			 loginType:this.$helper.getRuntime()
			 }
			 this.loading=true;
			 this.Api.codeLogin(formData).then(data=>{
			 this.loading=false;
			 this.login(data);
			 if(this.returnUrl){
				  console.log(2)
				uni.navigateTo({
					url:this.returnUrl
				})
			 }
			 else{
				console.log(3)
				uni.switchTab({
					url:'/pages/index/index'
				})
			 }
			},err=>{
				this.loading=false;
			})
		},
		userLogin(){
			if(config.env=='prod'){
				if(!this.mobile ){
					this.$toast('请输入用户名！');
					return;
				}
				this.userNameLogin(this.mobile);
				return;
			}
			if(!this.mobile ){
				this.$toast('请输入用户名/手机号！');
				return;
			}
			if(this.isPwd && !this.password){
				this.$toast('请输入密码！');
				return;
			}
			if(!this.isPwd && !this.code){
				this.$toast('请输入验证码！');
				return;
			}
			if(this.isPwd){
				this.pwdLogin()
			}else{
				this.codeLogin()
			}
			
		}
	}
};
</script>
<style>
	body {
	    background: #ffffff;
	}	
	uni-page-wrapper,uni-page-body{
		background: #FFFFFF;
		height: 100%;
	}
</style> 
<style lang="scss">


.plain-btn{
	border:none;
	background: #FFFFFF;
	padding-top: 16rpx;
	&::after {
			border:none
			}
}



.container {
	.tui-status-bar {
		width: 100%;
		height: var(--status-bar-height);
	}

	.tui-header {
		width: 100%;
		padding: 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
	}
	.header-title{
		font-size: 48rpx;
		font-weight: bold;
		color: $uni-text-color;
		line-height: 42rpx;
		// padding:  40rpx;
		box-sizing: border-box;
	}

	.tui-page-title {
		width: 100%;
		font-size: 36rpx;
		text-align: center;
		// font-weight: bold;
		color: $uni-text-color;
		line-height: 42rpx;
		padding: 40rpx;
		box-sizing: border-box;
		
		.active{
			font-size: 48rpx;
			font-weight: bold;
		}
		text{
			display: inline-block;
			padding: 0 32rpx;
			// &:first-child{
			// 	border-right: 1px solid #CCCCCC;
			// }
		}
		
	}

	.tui-form {
		// padding-top: 50rpx;

		.tui-view-input {
			width: 100%;
			box-sizing: border-box;
			padding: 0 40rpx;

			.tui-cell-input {
				width: 100%;
				display: flex;
				align-items: center;
				padding-top: 48rpx;
				padding-bottom: $uni-spacing-col-base;

				input {
					flex: 1;
					padding-left: $uni-spacing-row-base;
				}

				.tui-icon-close {
					margin-left: auto;
				}
			}
		}
		.tui-btn-send {
			width: 200rpx;
			text-align: right;
			flex-shrink: 0;
			font-size: $uni-font-size-base;
			color: $uni-color-primary;
		}

		.tui-cell-text {
			width: 100%;
			padding: $uni-spacing-col-lg $uni-spacing-row-lg;
			box-sizing: border-box;
			font-size: $uni-font-size-sm;
			color: $uni-text-color-grey;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.tui-color-primary {
				color: $uni-color-primary;
			}
		}

		.tui-btn-box {
			width: 100%;
			padding: 0 $uni-spacing-row-lg;
			box-sizing: border-box;
			margin-top: 80rpx;
		}
	}

	.tui-login-way {
		width: 100%;
		font-size: 26rpx;
		color: $uni-color-primary;
		display: flex;
		justify-content: center;
		position: fixed;
		left: 0;
		bottom: 80rpx;

		view {
			padding: 12rpx 0;
		}
	}

	.tui-auth-login {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-bottom: 80rpx;
		padding-top: 80rpx;

		.tui-icon-platform {
			width: 90rpx;
			height: 90rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			margin-left: 40rpx;
			border:none;
			&::after {
				content: '';
				position: absolute;
				width: 200%;
				height: 200%;
				transform-origin: 0 0;
				transform: scale(0.5, 0.5) translateZ(0);
				box-sizing: border-box;
				left: 0;
				top: 0;
				border-radius: 180rpx;
				border: 1rpx solid $uni-text-color-placeholder;
			}
		}

		.tui-login-logo {
			width: 60rpx;
			height: 60rpx;
		}
	}
}
</style>
