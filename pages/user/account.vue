<template>
	<view class="tui-userinfo-box">
		
		<tui-list-cell padding="0" :arrow="false"  >
			<view class="tui-list-cell ">
				<view>用户名</view>
				<view class="tui-content">{{userInfo.userName}}</view>
			</view>
		</tui-list-cell>
		<tui-list-cell padding="0" :arrow="false"  >
			<view class="tui-list-cell">
				<view>绑定手机号</view>
				<view class="tui-content">{{userInfo.phonenumber || '请绑定手机号'}}</view>
			</view>
		</tui-list-cell>
		<!-- <tui-list-cell padding="0" :arrow="true" @click="edit('sex')">
			<view class="tui-list-cell">
				<view>绑定微信</view>
				<view class="tui-content">{{userInfo.sex==1?"男":"女"}}</view>
			</view>
		</tui-list-cell> -->
		<!-- <tui-list-cell padding="0" :arrow="true" unlined >
			<view class="tui-list-cell">
				<view>出生日期</view>
				<view class="tui-content">{{userInfo.birthday}}</view>
			</view>
		</tui-list-cell> -->
	</view>
</template>

<script>

	export default {
		data() {
			return {}
		},
		onShow() {
			this.updateUserInfo();
		},
		methods: {
			edit(type){
				uni.navigateTo({
					url:'/pages/user/edit-user?type='+type
				})
			},
			bind(){
				uni.navigateTo({
					url:'/pages/auth/bind-mobile?from=user'
				})
			}
		}
	}
</script>

<style>
	.tui-userinfo-box {
		margin: 20rpx 0;
		color: #333;
	}

	.tui-list-cell {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24rpx 60rpx 24rpx 30rpx;
		box-sizing: border-box;
		font-size: 30rpx;
	}

	.tui-pr30 {
		padding-right: 30rpx;
	}

	.tui-avatar {
		width: 100rpx;
		height: 100rpx;
		display: block;
	}

	.tui-content {
		font-size: 26rpx;
		color: #666;
	}
</style>
