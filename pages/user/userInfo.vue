<template>
	<view class="tui-userinfo-box">
		<tui-list-cell padding="0" :arrow="false" >
			<view class="tui-list-cell">
				<view>头像</view>
				<image :src="userInfo.avatar" class="tui-avatar" mode="aspectFill"></image>
			</view>
		</tui-list-cell>
		<tui-list-cell padding="0"  >
			<view class="tui-list-cell ">
				<view>姓名</view>
				<view class="tui-content">{{userInfo.name || ''}}</view>
			</view>
		</tui-list-cell>
		<tui-list-cell padding="0"  >
			<view class="tui-list-cell ">
				<view>手机号</view>
				<view class="tui-content">{{userInfo.phonenumber || ''}}</view>
			</view>
		</tui-list-cell>
		<!-- <tui-list-cell padding="0">
			<view class="tui-list-cell">
				<view>所在地区</view>
				<view class="tui-content">{{userInfo.province || ''}} {{userInfo.city || ''}} {{userInfo.area || ''}}</view>
			</view>
		</tui-list-cell> -->
		
		<tui-list-cell padding="0" >
			<view class="tui-list-cell">
				<view>性别</view>
				<view class="tui-content">{{$helper.getSex(this.userInfo.sex)}}</view>
			</view>
		</tui-list-cell>
		<!-- <tui-list-cell padding="0" >
			<view class="tui-list-cell">
				<view>生日</view>
				<view class="tui-content">{{userInfo.birthday || ''}}</view>
			</view>
		</tui-list-cell> -->
		<!-- <tui-list-cell padding="0" >
			<view class="tui-list-cell">
				<view>微信</view>
				<view class="tui-content">{{userInfo.wechat || ''}}</view>
			</view>
		</tui-list-cell> -->
		<!-- <tui-list-cell padding="0" >
			<view class="tui-list-cell">
				<view>邮箱</view>
				<view class="tui-content">{{userInfo.email || ''}}</view>
			</view>
		</tui-list-cell> -->
		<!-- <tui-list-cell padding="0" :arrow="true" unlined >
			<view class="tui-list-cell">
				<view>出生日期</view>
				<view class="tui-content">{{userInfo.birthday}}</view>
			</view>
		</tui-list-cell> -->
		<!-- <view class="bottom-btn">
			<u-button @click="edit" type="primary">编辑</u-button>
		</view> -->
	</view>
</template>

<script>
import {
		mapState,mapMutations
	} from 'vuex';
	export default {
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		data() {
			return {
				sex:'',
				company:''
			}
		},
		onShow() {
			this.updateUserInfo()
			this.init()
		},
		onLoad() {
			
		},
		methods: {
			init(){
				this.sex=this.$helper.getSex(this.userInfo.sex);
			},
		
			changeAvatar(){
				uni.navigateTo({
					url:'/pages/user/crop'
				})
			},
			edit(){
				uni.navigateTo({
					url:'/pages/user/base-profile'
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
