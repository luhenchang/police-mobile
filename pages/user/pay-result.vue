<template>
	<view class="container">
		<view class="tui-bg"></view>
		<view class="tui-content">
			<view class="tui-form" v-if="result=='success'">
				<!-- <image src="/static/images/mall/img_recharge_success.png" class="tui-icon"></image> -->
				<tui-icon name="circle-selected" :size="50" color="#16AB60"></tui-icon>
				<view class="tui-title"><text class="price"> ￥ {{amount}}</text></view>
				<view class="tui-title">支付成功</view>
				<view class="tui-sub-title">非常感谢您购买我们的产品</view>
				<view class="tui-btn-box">
					<u-button type="error" size="medium" plain shape="circle" @click="go(1)">返回首页</u-button>
					<u-button type="error" size="medium" shape="circle" @click="go(2)">个人中心</u-button>
				</view>
			</view>
			<view class="tui-form" v-if="result=='fail'">
				<!-- <image src="/static/images/mall/img_recharge_success.png" class="tui-icon"></image> -->
				<tui-icon name="close" :size="50" color="red"></tui-icon>
				<view class="tui-title"><text class="price"> ￥ {{amount}}</text></view>
				<view class="tui-title">支付失败</view>
				<view class="tui-sub-title">请重新支付</view>
				<view class="tui-btn-box">
					<u-button type="error" size="medium" plain shape="circle" @click="go(1)">返回首页</u-button>
					<u-button type="error" size="medium" shape="circle" @click="go(3)">重新支付</u-button>
				</view>
			</view>
		</view>
		<view class="tui-tips" v-if="result=='success'">
			<view class="tui-grey">温馨提示:</view>
			<view class="tui-light-grey">
				付款成功后，自动升级会员。返回个人中心，如果还不是会员，请重新登录查看。如会员没有自动升级，请发送邮件与我们联系 xinghun_8@163.com。
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				result:'success',
				amount:'0.00',
				orderid:''
			}
		},
		onLoad(option) {
			this.result=option.result;
			this.amount=option.amount;
			this.orderid=option.orderid;
		},
		methods: {
			go(page) {
				if (page == 1) {
					uni.switchTab({
						url: "/pages/index/index"
					})
				} else if(page==2) {
					uni.switchTab({
						url: "/pages/user/index"
					})
				} else if(page==3) {
					this.navTo("/pages/user/member")
				}
			}
		}
	}
</script>

<style>
	.success{
		color: #16AB60;
	}
	.tui-bg {
		width: 100%;
		height: 260rpx;
		background: linear-gradient(20deg, #E41F19, #F34B0B);
		border-bottom-left-radius: 42rpx;
	}

	.tui-content {
		padding: 0 35rpx;
		box-sizing: border-box;
	}

	.tui-form {
		background: #fff;
		height: 560rpx;
		padding-top: 20rpx;
		box-shadow: 0 10rpx 14rpx 0 rgba(0, 0, 0, 0.08);
		border-radius: 10rpx;
		margin-top: -160rpx;
		position: relative;
		z-index: 10;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.tui-icon {
		width: 100rpx;
		height: 100rpx;
		display: block;
		margin-top: 60rpx;
	}

	.tui-title {
		font-size: 42rpx;
		line-height: 42rpx;
		padding-top: 28rpx;
	}

	.tui-sub-title {
		color: #666666;
		font-size: 28rpx;
		line-height: 28rpx;
		padding-top: 20rpx;
	}

	.tui-btn-box {
		width: 580rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 88rpx;
	}

	.tui-tips {
		font-size: 26rpx;
		padding: 48rpx 90rpx;
		box-sizing: border-box;
		text-align: justify;
		line-height: 48rpx;
	}

	.tui-grey {
		color: #555;
		padding-bottom: 8rpx;
	}

	.tui-light-grey {
		color: #888;
		line-height: 40rpx;
	}
</style>
