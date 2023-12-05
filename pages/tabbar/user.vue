<template>
	<view>
		<xui-login-wrap>
		<view class="tui-mybg-box">
			<image src="../../static/images/user_header.png"  class="tui-my-bg" mode="aspectFill"></image>
			 <view class="header-title">我的</view>
			<view class="tui-header-center">
				<view class="avatar-wrapper">
					<image :src="userInfo.avatar" v-if="userInfo.avatar" class="tui-avatar" >
					</image>
					<text v-else>{{userInfo.name && userInfo.name.substr(0,1) }}</text>
				</view>
				<view class="tui-info" @click="navTo('/pages/user/userInfo')">
					<view>
					<view class="tui-nickname">{{userInfo.name ||  userInfo.phonenumber || ''}} 
					</view>
					<view class="tui-explain" ><text>{{userInfo.dept && userInfo.dept.deptName}}</text> </view>
					<view class="tui-explain">{{ userInfo.roleName}} </view>
					</view>
					<u-icon name="arrow-right" size="36" color="#666"></u-icon>
				</view>
			</view>
		</view>
		<view class="tui-content-box">
			<view class="tui-box ">
				
			</view>
		</view>
		
		
		<view class="tui-content-box">
	

			<view class="tui-box tui-tool-box">
				<tui-list-cell :arrow="false" padding="0" :lineLeft="false">
					<view class="tui-cell-header">
						<view class="tui-cell-title">常用功能</view>
						<!-- <view class="tui-cell-sub">查看更多</view> -->
					</view>
				</tui-list-cell>
				<view class="tui-order-list tui-flex-wrap">
					<view class="tui-tool-item" @click="navTo('/pages/user/userInfo')" >
						<view class="tui-icon-box">
							<u-icon name="account-fill" :size="60" :color="tempColor" ></u-icon>
						</view>
						<view class="tui-tool-text">个人资料</view>
					</view>
				<!-- 	<view class="tui-tool-item" @click="syncTest">
						<view class="tui-icon-box">
							<u-icon name="chat-fill" :size="60" :color="tempColor" ></u-icon>
						</view>
						<view class="tui-tool-text">测试</view>
					</view> -->
					<!-- <view class="tui-tool-item" @click="navTo('/pages/user/account')">
						<view class="tui-icon-box">
						<u-icon name="lock-fill" :size="60" :color="tempColor"></u-icon>
						</view>
						<view class="tui-tool-text">账号与安全</view>
					</view>
					<view class="tui-tool-item" @click="navTo('/pages/auth/forgetPwd/forgetPwd')" >
						<view class="tui-icon-box">
						<u-icon name="edit-pen-fill" :size="60" :color="tempColor"></u-icon>
						</view>
						<view class="tui-tool-text">修改密码</view>
					</view> -->
				
					
					<view class="tui-tool-item" @click="navTo('/pages/user/single-page?name=about')">
						<view class="tui-icon-box">
								<u-icon name="info-circle-fill" :size="60" :color="tempColor" ></u-icon>
						</view>
						<view class="tui-tool-text">关于应用</view>
					</view>
					
					
					<view class="tui-tool-item" @click="navTo('/pages/user/set')">
						<view class="tui-icon-box">
								<u-icon name="setting-fill" :size="60" :color="tempColor"></u-icon>
						</view>
						<view class="tui-tool-text">设置</view>
					</view>
					
				</view>
			</view>

			
		</view>
		</xui-login-wrap>
	
	</view>
</template>

<script>

	
	export default {
		
		onLoad: function(options) {
			console.log(this.userInfo);
		},
		data() {
			return {
				top: 0, //标题图标距离顶部距离
				opcity: 0,
				roleText:'',
				scrollTop: 0.5,
				expire_time:'',
				iosOnline:false,
				headimg:'',
				memberName:'普通用户',
				sumInfo:{},
				orderCount:{},
				subDistributors:[],
				langShow:false,
				langList:[
					{
					text:'简体中文',
					locale:'zh-CN'
					},
					{
					text:'English',
					locale:'en-US'
					},
					{
					text:'繁体中文',
					locale:'zh-HK'
					},
				]
				}
				
		},
		onShow() {
			this.init()
		
		},
		methods: {
			init(){
				if(this.hasLogin){
					console.log(this.userInfo);
				 this.updateUserInfo();
				}else{
					this.navToLogin();
				}
			},
			langClick(index){
			   let 	locale=this.langList[index].locale;
			   this.$cache.put('locale',locale);
			   this.$i18n.locale = locale;
			   this.$helper.setTabbarlang(this);
			},
			noOpen(){
				this.$toast('暂未开放，敬请期待');
			},
			syncTest(){
				this.Api.syncTest({data:testStr}).then(data=>{
					console.log(data);
				})
			},
			changLang(){
				this.langShow=true;
			},
			back() {
				uni.navigateBack();
			}
		}
		
	}
</script>

<style lang="scss">
	button{
		background: none;
		padding: 0;
		line-height: auto;
	}
	.avatar-wrapper{
		position: relative;
		min-width: 128rpx;
		height: 128rpx;
		border-radius: 50%;
		text-align: left;
		line-height: 128rpx;
		background: $base-color;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 40rpx;
	}
	.tui-header-box {
		width: 100%;
		padding: 0 30rpx 0 20rpx;
		box-sizing: border-box;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		height: 32px;
		transform: translateZ(0);
		z-index: 9999;
	}

	/* #ifndef MP */
	.tui-header-icon {
		min-width: 120rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	/* #endif */
	/* #ifdef MP */
	.tui-set-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	/* #endif */
	.tui-icon-box {
		position: relative;
		.iconfont{
			font-size: 56rpx;
		}
	}

	.tui-icon-setup {
		margin-left: 8rpx;
	}

	.tui-badge {
		position: absolute;
		font-size: 24rpx;
		height: 32rpx;
		min-width: 32rpx;
		padding: 0 6rpx;
		border-radius: 40rpx;
		right: 10rpx;
		top: -5rpx;
		transform: scale(0.8) translateX(60%);
		transform-origin: center center;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}

	.tui-badge-red {
		background: #F74D54;
		color: #fff;
	}

	.tui-badge-white {
		background: #fff;
		color: #F74D54;
	}

	.tui-badge-dot {
		position: absolute;
		height: 12rpx;
		width: 12rpx;
		border-radius: 50%;
		right: -12rpx;
		top: 0;
		background: #F74D54;
	}

	.tui-mybg-box {
		width: 100%;
		height: 280rpx;
		position: relative;
	}
	.header-title{
		position: absolute;
		top: 50rpx;
		left: 30rpx;
		color: #FFFFFF;
		font-size: 36rpx;
		font-weight: bold;
	}

	.tui-my-bg {
		width: 100%;
		height: 280rpx;
		display: block;
	}

	.tui-header-center {
		position: absolute;
		width: calc(100vw - 60rpx);
		left: 30rpx;
		bottom: -70rpx;
		padding: 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		background: #FFFFFF;
		border-radius: 20rpx;
		box-shadow: 5px 5px 15px #ddd;
	}

	.tui-avatar {
		flex-shrink: 0;
		width: 128rpx;
		height: 128rpx;
		display: block;
		border-radius: 50%;
		background: #F5F5F5;
	}

	.tui-info {
		width: 100%;
		padding-left: 30rpx;
		display: flex;
		justify-content: space-between;
	}

	.tui-nickname {
		font-size: 32rpx;
		font-weight: 500;
		color: #000;
		display: flex;
		align-items: center;
	}

	.tui-img-vip {
		width: 56rpx;
		height: 24rpx;
		margin-left: 18rpx;
	}

	.tui-explain {
		width: 100%;
		font-size: 24rpx;
		font-weight: 400;
		color: #333;
		opacity: 0.75;
		padding-top: 8rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-btn-edit {
		flex-shrink: 0;
		padding-right: 22rpx;
	}

	.tui-header-btm {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		position: absolute;
		left: 0;
		top: 280rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #fff;
	}

	.tui-btm-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.tui-btm-num {
		font-size: 32rpx;
		font-weight: 600;
		position: relative;
	}

	.tui-btm-text {
		font-size: 24rpx;
		opacity: 0.85;
		padding-top: 4rpx;
	}

	.tui-content-box {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		position: relative;
		top: 72rpx;
		z-index: 10;
	}

	.tui-box {
		width: 100%;
		background: #fff;
		box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
		border-radius: 10rpx;
		overflow: hidden;
	}

	.tui-cell-header {
		width: 100%;
		height: 74rpx;
		padding: 0 26rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-cell-title {
		font-size: 30rpx;
		line-height: 30rpx;
		font-weight: 600;
		color: #333;
	}

	.tui-cell-sub {
		font-size: 26rpx;
		font-weight: 400;
		color: #999;
		padding-right: 28rpx;
	}

	.tui-order-list {
		width: 100%;
		height: 134rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;

	}

	.tui-order-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.tui-order-text,
	.tui-tool-text {
		font-size: 26rpx;
		font-weight: 400;
		color: #666;
		padding-top: 4rpx;
	}

	.tui-tool-text {
		font-size: 24rpx;
	}

	.tui-order-icon {
		width: 56rpx;
		height: 56rpx;
		display: block;
	}

	.tui-assets-box {
		margin-top: 20rpx;
	}

	.tui-assets-list {
		
	}

	.tui-assets-num {
		font-size: 32rpx;
		font-weight: 500;
		color: #333;
		position: relative;
	}

	.tui-assets-text {
		font-size: 24rpx;
		font-weight: 400;
		color: #666;
		padding-top: 6rpx;
	}

	.tui-tool-box {
		margin-top: 20rpx;
	}

	.tui-flex-wrap {
		flex-wrap: wrap;
		height: auto;
		padding-bottom: 30rpx;
	}

	.tui-tool-item {
		width: 33%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding-top: 30rpx;
	}

	.tui-tool-icon {
		width: 64rpx;
		height: 64rpx;
		display: block;
	}

	.tui-badge-icon {
		width: 66rpx;
		height: 30rpx;
		position: absolute;
		right: 0;
		transform: translateX(88%);
		top: -15rpx;
	}

	/*为你推荐*/
	.tui-product-list {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		box-sizing: border-box;
	}

	.tui-product-container {
		flex: 1;
		margin-right: 2%;
	}

	.tui-product-container:last-child {
		margin-right: 0;
	}

	.tui-pro-item {
		width: 100%;
		margin-bottom: 4%;
		background: #fff;
		box-sizing: border-box;
		border-radius: 12rpx;
		overflow: hidden;
	}

	.tui-pro-img {
		width: 100%;
		display: block;
	}

	.tui-pro-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 20rpx;
	}

	.tui-pro-tit {
		color: #2e2e2e;
		font-size: 26rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-pro-price {
		padding-top: 18rpx;
	}

	.tui-sale-price {
		font-size: 34rpx;
		font-weight: 500;
		color: #e41f19;
	}

	.tui-factory-price {
		font-size: 24rpx;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12rpx;
	}

	.tui-pro-pay {
		padding-top: 10rpx;
		font-size: 24rpx;
		color: #656565;
	}

	.tui-btn-back {
		width: 88rpx;
		height: 88rpx;
		font-size: 26rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background-color: rgba(0, 0, 0, .5);
		color: #fff;
		position: fixed;
		bottom: 60rpx;
		right: 30rpx;
		z-index: 9999;
	}
</style>
