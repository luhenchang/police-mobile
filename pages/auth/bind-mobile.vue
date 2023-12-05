<template>
	<view class="container">
		<view class="tui-status-bar"></view>
		<view class="tui-page-title">
		<view class="margin-tb"><tui-icon name="back" :size="30" color="#999" @click="back()"></tui-icon></view>
			{{text}}手机号</view>
			
		<view class="tui-form">
			<view class="pannel-white sub-txt" v-if=" from =='login'">为了您的账户安全，请绑定手机号</view>
			<view class="tui-view-input">
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="mobile" color="#6d7a87" :size="20"></tui-icon>
						<input :value="mobile" placeholder="请输入手机号" placeholder-class="tui-phcolor" type="number" maxlength="11" @input="inputMobile" />
						<view class="tui-icon-close" v-show="mobile" @click="clearInput(1)"><tui-icon name="close-fill" :size="16" color="#bfbfbf"></tui-icon></view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="shield" color="#6d7a87" :size="20"></tui-icon>
						<input placeholder="请输入验证码" placeholder-class="tui-phcolor" type="text" maxlength="6" @input="inputCode" />
						<view class="tui-btn-send" @click="sendCode" :class="{ 'tui-gray': isSend }" :hover-class="isSend ? '' : 'tui-opcity'" :hover-stay-time="150">{{ btnSendText }}</view>
					</view>
				</tui-list-cell>
				
			</view>
			<view class="tui-btn-box">
				<u-button :disabledGray="true" type="primary"  :disabled="disabled" :shadow="true" shape="circle" @click="register">立即{{text}}</u-button></view>
		
		</view>
		<view class="tui-cell-text pannel-white sub-txt text-center" @click="back" style="margin-top: 100rpx;">
			暂不{{text}}
		</view>
	</view>
</template>

<script>
import { mapMutations,mapState } from 'vuex';
export default {
	computed: {
		...mapState(['hasLogin','userInfo']),
		disabled: function() {
			let bool = true;
			if (this.mobile && this.code) {
				bool = false;
			}
			return bool;
		}
	},
	data() {
		return {
			from:'user',
			mobile: '',
			password: '',
			code: '',
			isSend: false,
			timer:null,
			time:0,
			text:'修改',
			btnSendText: '获取验证码' //倒计时格式：(60秒)
		};
	},
	onShow() {
		this.init()
	},
	onLoad(option) {
	 
		
	},
	methods: {
		...mapMutations(['login', 'logout']),
		init(){
			if(!this.hasLogin){
				uni.navigateTo({
					url:'/pages/auth/login/login'
				})
				return;
			}
			if(!this.userInfo.phonenumber){
				this.from='login';
				this.text='绑定';
			}
		},
		back() {
			if(this.from=='user'){
				uni.navigateBack();
			}else{
				this.toHome();
			}
			
		},
		toHome(){
			console.log('toHome')
		   uni.switchTab({
		   	 url:'/pages/index/index'
		   })	
		},
		inputCode(e) {
			this.code = e.detail.value;
		},
		inputMobile: function(e) {
			this.mobile = e.detail.value;
		},
		inputPwd: function(e) {
			this.password = e.detail.value;
		},
		clearInput(type) {
			if (type == 1) {
				this.mobile = '';
			} else {
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
			if(this.mobile==this.userInfo.phonenumber){
				this.$toast('修改的手机号不能与现绑定的手机号相同');
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
			if(!this.mobile){
				this.$toast('请输入手机号');
				return ;
			}
			if(this.mobile==this.userInfo.phonenumber){
				this.$toast('修改的手机号不能与现绑定的手机号相同');
				return ;
			}
			if(!this.code){
				this.$toast('请输入验证码');
				return ;
			}
			
			let params={
				phoneNumber:this.mobile,
				verifyCode:this.code,
				register_type:this.$helper.getRuntime()
			}
			this.Api.bindMobile(params).then(data=>{
				if(!data){
					this.$alert('绑定失败');
				}else{
					this.back();
				}
				
			})
		}
		
	}
};
</script>

<style lang="scss" >
body {
    background: #ffffff;
}
uni-page-wrapper,uni-page-body,html,body{
	background: #FFFFFF;
	height: 100%;
}
	.margin-tb{
		margin-bottom: 20px ;
	}
.container {
	.tui-page-title {
		width: 100%;
		font-size: 48rpx;
		font-weight: bold;
		color: $uni-text-color;
		line-height: 42rpx;
		padding:  40rpx;
		box-sizing: border-box;
	}
	.tui-form {
		padding-top: 50rpx;
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
				padding-left: $uni-spacing-row-sm;
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
