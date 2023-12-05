<template>
	<view class="container">
		<view class="tui-status-bar"></view>
		<view class="tui-header">
			<tui-icon name="back" :size="26" @click="back"></tui-icon>
			<!-- #ifndef MP-WEIXIN -->
			<view class="tui-page-title">修改密码</view>
			<!-- #endif -->
		</view>
		<view class="center logo-wrapper">
			<!-- <image class="logo" :src="sysConfig['app.logo']"></image> -->
			<image class="logo" src="../../../static/images/logo.png"></image>
			<view class="bold">{{sysConfig['app.name']}}</view>
		</view>
			<!-- #ifdef MP -->
			<view class="tui-page-title center">修改密码</view>
			<!-- #endif -->
		<view class="tui-form">
			<view class="tui-view-input">
			<!-- 	<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="people" color="#6d7a87" :size="20"></tui-icon>
						<input :value="username" placeholder="请输入用户名" placeholder-class="tui-phcolor" type="number" maxlength="11" @input="inputUsername" />
						<view class="tui-icon-close" v-show="username" @click="clearInput(1)"><tui-icon name="close-fill" :size="16" color="#bfbfbf"></tui-icon></view>
					</view>
				</tui-list-cell> -->
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="pwd" color="#6d7a87" :size="20"></tui-icon>
						<input v-model="oldPassword" placeholder="请输入旧密码" placeholder-class="tui-phcolor" :password="true"  />
						<view class="tui-icon-close" v-show="oldPassword" @click="clearInput(1)"><tui-icon name="close-fill" :size="16" color="#bfbfbf"></tui-icon></view>
					</view>
				</tui-list-cell>
				<!-- <tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="shield" color="#6d7a87" :size="20"></tui-icon>
						<input placeholder="请输入验证码" v-model="code" placeholder-class="tui-phcolor" type="text" maxlength="6"  />
						<view class="tui-btn-send" @click="sendCode" :class="{ 'tui-gray': isSend }" :hover-class="isSend ? '' : 'tui-opcity'" :hover-stay-time="150">{{ btnSendText }}</view>
					</view>
				</tui-list-cell> -->
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="pwd" color="#6d7a87" :size="20"></tui-icon>
						<input v-model="newPassword" placeholder="请输入新密码" :password="true" placeholder-class="tui-phcolor" type="text" maxlength="40"  />
						<view class="tui-icon-close" v-show="newPassword" @click="clearInput(2)"><tui-icon name="close-fill" :size="16" color="#bfbfbf"></tui-icon></view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="pwd" color="#6d7a87" :size="20"></tui-icon>
						<input v-model="confirmPassword" placeholder="确认新密码" :password="true" placeholder-class="tui-phcolor" type="text" maxlength="40"  />
						<view class="tui-icon-close" v-show="confirmPassword" @click="clearInput(3)"><tui-icon name="close-fill" :size="16" color="#bfbfbf"></tui-icon></view>
					</view>
				</tui-list-cell>
			</view>
			<view class="tui-btn-box">
				<u-button :disabledGray="true" @click="register" type="primary" :disabled="disabled" :shadow="true" shape="circle">确认修改</u-button></view>
		</view>
		<!-- <xui-footer></xui-footer> -->
	</view>
</template>

<script>
import { mapMutations,mapState } from 'vuex';
export default {
	computed: {
		...mapState(['sysConfig']),
		disabled: function() {
			let bool = true;
			if (this.oldPassword && this.newPassword && this.confirmPassword) {
				bool = false;
			}
			return bool;
		}
	},
	data() {
		return {
			oldPassword:'',
			newPassword: '',
			confirmPassword: '',
			isSend: false,
			timer:null,
			time:0,
			btnSendText: '获取验证码' //倒计时格式：(60秒)
		};
	},
	onLoad() {
		if(!this.hasLogin){
			this.navToLogin();
		}
	},
	methods: {
		back() {
			uni.navigateBack();
		},
		
		clearInput(type) {
			if (type == 1) {
				this.oldPassword = '';
			} else if(type == 2) {
				this.newPassword = '';
			}else if(type == 3) {
				this.confirmPassword = '';
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
			this.Api.sendCode({mobile:this.mobile}).then(data=>{
				this.$toast('发送成功，请注意查收！');
				 this.time=60;
				 this.isSend=true;
				 this.startTimer()
			})
		},
		register(){
			if(!this.oldPassword){
				this.$toast('请输入旧密码');
				return ;
			}
			if(!this.newPassword){
				this.$toast('请输入新密码');
				return ;
			}
			if(!this.confirmPassword){
				this.$toast('请再次输入新密码');
				return ;
			}
			if(this.newPassword != this.confirmPassword){
				this.$toast('两次输入密码不一致');
				return ;
			}
			let params={
				oldPassword:this.oldPassword.trim(),
				newPassword:this.newPassword.trim(),
			}
			this.Api.updateUserPwd(params).then(data=>{
				this.$toast('密码修改成功！');
				uni.navigateBack()
				setTimeout(function(){
					uni.switchTab({
						url:'/pages/index/index'
					})
				},1000)
			})
		}
	}
};
</script>

<style lang="scss">
	body {
	    background: #ffffff;
	}
uni-page-wrapper,uni-page-body{
		background: #FFFFFF;
		height: 100%;
	}
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
		.tui-btn-box {
			width: 100%;
			padding: 0 $uni-spacing-row-lg;
			box-sizing: border-box;
			margin-top: 80rpx;
		}
	}
}
</style>
