<template>
	<view class="container padding-bottom">
		<view class="tui-status-bar"></view>
		<!-- #ifndef MP -->
		<view class="tui-header">
			<tui-icon name="back" :size="26" @click="back"></tui-icon>
			<view class="tui-page-title ">注册</view>
		</view>
		<!-- #endif -->
		
		<view class="center logo-wrapper">
			<!-- <image class="logo" :src="sysConfig['app.logo']"></image> -->
			<image class="logo" src="../../../static/images/logo.png"></image>
			<view class="bold">{{sysConfig['app.name']}}</view>
		</view>
		<!-- #ifdef MP -->
		<view class="tui-page-title center">
			注册</view>
		<!-- #endif -->
		
		<view class="tui-form">
			<view class="tui-view-input">
				
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="mobile" color="#6d7a87" :size="20"></tui-icon>
						<input v-model="mobile" placeholder="请输入手机号" placeholder-class="tui-phcolor" type="number" maxlength="11" />
						<view class="tui-icon-close" v-show="mobile" @click.stop @click="clearInput('mobile')"><tui-icon name="close-fill" :size="16" color="#bfbfbf"></tui-icon></view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="shield" color="#6d7a87" :size="20"></tui-icon>
						<input placeholder="请输入验证码" v-model="code" placeholder-class="tui-phcolor" type="text" maxlength="6"  />
						<view class="tui-btn-send" @click.stop @click="sendCode" :class="{ 'tui-gray': isSend }" :hover-class="isSend ? '' : 'tui-opcity'" :hover-stay-time="150">{{ btnSendText }}</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="pwd" color="#6d7a87" :size="20"></tui-icon>
						<input v-model="password" placeholder="请输入密码" :password="true" placeholder-class="tui-phcolor" type="text" maxlength="40"  />
						<view class="tui-icon-close" v-show="password" @click.stop @click="clearInput('pwd')"><tui-icon name="close-fill" :size="16" color="#bfbfbf"></tui-icon></view>
					</view>
				</tui-list-cell>
				
			</view>
			
				
			<view class="tui-cell-text panel-white margin-lr">
				 	<u-checkbox-group >
				 			<u-checkbox 
				 				v-model="checked" 
				 			>
							<view class="margin-lr">已阅读并同意 {{sysConfig['app.name']}}</view>
					   <view><text @click="navTo('/pages/user/single-page?name=privacy')" class="tui-color-primary">《隐私政策》</text>、
					   <text @click="navTo('/pages/user/single-page?name=userterms')" class="tui-color-primary">《用户协议》</text>
					   </view>
					</u-checkbox>
					</u-checkbox-group>
			</view>
			<view class="panel-white">
			<u-button  type="primary" :shadow="true" shape="circle" @click="register">注册</u-button>
			</view>
		</view>
		
		<xui-footer></xui-footer>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			mobile: '',
			password: '',
			checked:false,
			code: '',
			isSend: false,
			company:'',
			addr:'',
			name:'',
			timer:null,
			time:0,
			showRegion:false,
			showCompany:false,
			province:'',
			city:'',
			area:'',
			position:'',
			defaultRegion:[],
			loading:false,
			btnSendText: '获取验证码', //倒计时格式：(60秒)
			regionParams : {
				province: true,
				city: true,
				area: true
			}
		};
	},
	onShow() {
		console.log(this.sysConfig)
	},
	methods: {
		back() {
			uni.navigateBack();
		},
		clearInput(type) {
			if (type == 'mobile') {
				this.mobile = '';
			} else if(type=='pwd'){
				this.password = '';
			}
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
			this.Api.sendCode({phoneNumber:this.mobile}).then(data=>{
				this.$toast('发送成功，请注意查收！');
				 this.time=60;
				 this.isSend=true;
				 this.startTimer()
			})
		},
		register(){
			if(!this.checked){
				this.$toast('请阅读并同意用户条款和隐私条款');
				return ;
			}
			if(!this.mobile){
				this.$toast('请输入手机号');
				return ;
			}
			if(!this.code){
				this.$toast('请输入验证码');
				return ;
			}
			if(!this.password){
				this.$toast('请输入密码');
				return ;
			}
			
			
			let params={
				phonenumber:this.mobile,
				verifyCode:this.code,
				password:this.password,
				userType:'09',
				registerType:this.$helper.getRuntime()
			}
			// #ifdef APP-PLUS
			let clientInfo=plus.push.getClientInfo();
			params.clientInfo=clientInfo;
			// #endif
			console.log(params);
			this.loading=true;
			this.Api.register(params).then(data=>{
				this.loading=false;
				console.log(data);
				if(data){
					this.$alert(data);
				}else{
					this.successBack("注册成功，请登录");
					// let loginBody={
					// 	username:this.mobile,
					// 	password:this.password,
					// 	userType:"09"
					// }
					// this.Api.login(loginBody).then(data=>{
					// 	this.login(data.token);
					// 	this.updateUserInfo();
					// 	uni.showModal({
					// 		title:'提示',
					// 		content:'注册成功',
					// 		showCancel:false,
					// 		success(e) {
					// 			if(e.confirm){
					// 				uni.switchTab({
					// 					url:'/pages/index/index'
					// 				})
					// 			}
					// 		}
					// 	})
					// })
				}
				
			},err=>{
				this.loading=false;
			})
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
		min-height: 100%;
		height: auto;
	}
</style>
<style lang="scss" >

	.margin-tb{
		margin-bottom: 20px ;
	}
.container {
	.tui-header {
		width: 100%;
		padding: 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
	}
	.tui-page-title {
		// width: 100%;
		font-size: 48rpx;
		font-weight: bold;
		color: $uni-text-color;
		line-height: 42rpx;
		// padding:  40rpx;
		box-sizing: border-box;
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
				.tui-btn-send {
					width: 200rpx;
					text-align: right;
					flex-shrink: 0;
					font-size: $uni-font-size-base;
					color: $uni-color-primary;
				}
				.tui-gray {
					color: $uni-text-color-placeholder;
				}
			}
		}
		.tui-cell-text {
			width: 100%;
			padding: 40rpx $uni-spacing-row-lg;
			box-sizing: border-box;
			font-size: $uni-font-size-sm;
			color: $uni-text-color-grey;
			display: flex;
			align-items: center;
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
}
</style>
