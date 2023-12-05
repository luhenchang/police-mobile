<template>
	<view>
	<!--header-->
	<view class="tui-header-box" :style="{ height: height + 'px', background: 'rgba(255,255,255,' + opcity + ')' }">
		<view class="tui-header" :style="{ paddingTop: top + 'px', opacity: opcity }">商品详情</view>
		<view class="tui-header-icon" :style="{ marginTop: top + 'px' }">
			<view class="tui-icon-box" :style="{ backgroundColor: 'rgba(0, 0, 0,' + iconOpcity + ')' }" @click="back">
				<tui-icon name="arrowleft" :size="30" :color="opcity >= 1 ? '#000' : '#fff'"></tui-icon>
			</view>
			<view class="tui-icon-box tui-icon-ml" :style="{backgroundColor: 'rgba(0, 0, 0,' + iconOpcity + ')'}" @click.stop="openMenu">
				<tui-icon name="more-fill" :size="20" :color="opcity >= 1 ? '#000' : '#fff'"></tui-icon>
				<!-- <tui-badge type="red" :scaleRatio="0.8" absolute top="0" right="-4rpx">5</tui-badge> -->
			</view>
		</view>
	</view>
	<!--header-->
	
	<!--顶部下拉菜单-->
	<tui-top-dropdown backgroundColor="rgba(76, 76, 76, 0.95)" :show="menuShow" :height="0" @close="closeMenu">
		<view class="tui-menu-box tui-padding tui-ptop">
			<view class="tui-menu-header" :style="{ paddingTop: top + 'px' }">功能直达</view>
			<view class="tui-menu-itembox">
				<block v-for="(item, index) in topMenu" :key="index">
					<view class="tui-menu-item" hover-class="tui-opcity" :hover-stay-time="150" @click="btnTopMenu(index)">
						<view class="tui-badge-box">
							<tui-icon :name="item.icon" color="#fff" :size="item.size"></tui-icon>
							<tui-badge type="red" :scaleRatio="0.8" absolute right="-8rpx" v-if="item.badge">{{ item.badge }}</tui-badge>
						</view>
						<view class="tui-menu-text">{{ item.text }}</view>
					</view>
				</block>
			</view>
			<view class="tui-icon-up_box">
				<tui-icon name="up" color="#fff" :size="26" @click="closeMenu"></tui-icon>
			</view>
		</view>
	</tui-top-dropdown>
	<!---顶部下拉菜单-->
	</view>
</template>

<script>
	import {
		mapState,mapMutations
	} from 'vuex';
	export default {
		props:{
			title:{
				type:String,
				default:''
			}
		},
		computed:{
		},
		data() {
			return {
				height: 64, //header高度
				top: 26, //标题图标距离顶部距离
				scrollH: 0, //滚动总高度
				opcity: 0,
				iconOpcity: 0.5,
				menuShow:false,
				topMenu: [
					// {
					// 	icon: 'message',
					// 	text: '消息',
					// 	size: 26,
					// 	badge: 3
					// },
					{
						icon: 'home',
						text: '首页',
						size: 23,
						badge: 0
					},
					{
						icon: 'people',
						text: '我的',
						size: 26,
						badge: 0
					},
					{
						icon: 'cart',
						text: '购物车',
						size: 23,
						badge: 0
					},
					// {
					// 	icon: 'kefu',
					// 	text: '客服小蜜',
					// 	size: 26,
					// 	badge: 0
					// },
					{
						icon: 'feedback',
						text: '我要反馈',
						size: 23,
						badge: 0
					},
					{
						icon: 'share',
						text: '分享',
						size: 26,
						badge: 0
					}
				],
			};
		},
		created() {
				this.init();
		},
		onPageScroll(e) {
			let scroll = e.scrollTop <= 0 ? 0 : e.scrollTop;
			let opcity = scroll / this.scrollH;
			if (this.opcity >= 1 && opcity >= 1) {
				return;
			}
			this.opcity = opcity;
			this.iconOpcity = 0.5 * (1 - opcity < 0 ? 0 : 1 - opcity);
		},
		methods:{
			init(){
				let obj = {};
				// #ifdef MP-WEIXIN
				obj = wx.getMenuButtonBoundingClientRect();
				// #endif
				// #ifdef MP-BAIDU
				obj = swan.getMenuButtonBoundingClientRect();
				// #endif
				// #ifdef MP-ALIPAY
				my.hideAddToDesktopMenu();
				// #endif
				
				setTimeout(() => {
					uni.getSystemInfo({
						success: res => {
							this.width = obj.left || res.windowWidth;
							this.height = obj.top ? obj.top + obj.height + 8 : res.statusBarHeight + 44;
							this.top = obj.top ? obj.top + (obj.height - 32) / 2 : res.statusBarHeight + 6;
							this.scrollH = res.windowWidth;
						}
					});
				}, 0);
			},
			back: function() {
				uni.navigateBack();
			},
			openMenu: function() {
				this.menuShow = true;
			},
			closeMenu: function() {
				this.menuShow = false;
			},
			btnTopMenu(index) {
				this.closeMenu()
				// if (index == 4) {
				// 	uni.makePhoneCall({
				// 		phoneNumber: "10086"
				// 	})
				// } else 
				if (index == 4) {
					this.showSharePopup()
				} else {
					let url = {
						0: "/pages/index/index",
						1: '/pages/tabbar/user',
						2: '/pages/mall/cart',
						3: '/pages/user/feedback?page=mall'
					} [index];
					if (index > 1) {
						url && this.navTo(url)
					} else {
						uni.switchTab({
							url: url
						})
					}
				}
			},
			
		}
	}
</script>

<style lang="scss">
	.tui-header-box {
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 995;
	}

	.tui-header {
		width: 100%;
		font-size: 18px;
		line-height: 18px;
		font-weight: 500;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-header-icon {
		position: fixed;
		top: 0;
		left: 10px;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		height: 32px;
		transform: translateZ(0);
		z-index: 9999;
	}

	.tui-header-icon .tui-badge {
		background: #e41f19 !important;
		position: absolute;
		right: -4px;
	}

	.tui-icon-ml {
		margin-left: 20rpx;
	}

	.tui-icon-box {
		position: relative;
		height: 60rpx !important;
		width: 60rpx !important;
		padding: 12rpx !important;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	/*顶部菜单*/
	
	.tui-menu-box {
		box-sizing: border-box;
	}
	
	.tui-menu-header {
		font-size: 34rpx;
		color: #fff;
		height: 32px;
		display: flex;
		align-items: center;
	}
	
	.tui-menu-itembox {
		color: #fff;
		padding: 40rpx 10rpx 0 10rpx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		font-size: 26rpx;
	}
	
	.tui-menu-item {
		width: 22%;
		height: 160rpx;
		border-radius: 24rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		background: rgba(0, 0, 0, 0.4);
		margin-right: 4%;
		margin-bottom: 4%;
	}
	
	.tui-menu-item:nth-of-type(4n) {
		margin-right: 0;
	}
	
	.tui-badge-box {
		position: relative;
	}
	
	.tui-badge-box .tui-badge-class {
		position: absolute;
		top: -8px;
		right: -8px;
	}
	
	.tui-msg-badge {
		top: -10px;
	}
	
	.tui-icon-up_box {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.tui-menu-text {
		padding-top: 12rpx;
	}
	
	.tui-opcity .tui-menu-text,
	.tui-opcity .tui-badge-box {
		opacity: 0.5;
		transition: opacity 0.2s ease-in-out;
	}
	
	/*顶部菜单*/
	
</style>
