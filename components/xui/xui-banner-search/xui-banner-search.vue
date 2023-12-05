<template>
	<view>
		<!-- <view class="tui-status-bar"></view> -->
		<!--header-->
		<view class="tui-header" >
			<xui-current-city color="#ffffff" />
			<view class="tui-rolling-search" @click="search">
				<tui-icon name="search-2" :size="32" unit="rpx"></tui-icon>
				<swiper vertical autoplay circular interval="3000" class="tui-swiper">
					<swiper-item v-for="(item, index) in hotSearch" :key="index" class="tui-swiper-item" >
						<view class="tui-hot-item">{{ item }}</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="tui-header-banner">
			<!-- <view class="tui-hot-search">
				<view>热搜</view>
				<view class="tui-hot-tag" @tap="search">自热火锅</view>
				<view class="tui-hot-tag" @tap="search">华为手机</view>
				<view class="tui-hot-tag" @tap="search">有机酸奶</view>
				<view class="tui-hot-tag" @tap="search">苹果手机</view>
			</view> -->
			<view class="tui-banner-bg">
				<view class="tui-primary-bg tui-route-left"></view>
				<view class="tui-primary-bg tui-route-right"></view>
				<!--banner-->
				<view class="tui-banner-box">
					<swiper :indicator-dots="true" :autoplay="true" :interval="5000" :duration="150" class="tui-banner-swiper"
					 :circular="true" indicator-color="rgba(255, 255, 255, 0.8)" indicator-active-color="#fff">
						<swiper-item v-for="(item, index) in list" :key="index" >
							<image :src="item.image" class="tui-slide-image" @click="navToDetail(item)" mode="aspectFill" />
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="banner-bottom"></view>
	</view>
</template>

<script>
	import {
		mapState,mapMutations
	} from 'vuex';
	export default {
		props:{
			position:{
				type:String,
				default:'index'
			}
		},
		data() {
			return {
				hotSearch: [],
				list:[],
				swiperCurrent:0,
				swiperLength:0
			};
		},
		watch:{
			sysConfig(nval){
				if(this.sysConfig && this.sysConfig.hot_key ){
					this.hotSearch=this.sysConfig.hot_key.split(',');
				}
			}
		},
		created() {
				this.loadData();
		},
		methods:{
			loadData(){
				if(this.sysConfig && this.sysConfig.hot_key ){
					this.hotSearch=this.sysConfig.hot_key.split(',');
				}
				this.hotSearch.unshift("搜商家、盲盒、商品")
				this.Api.getBanner({position:this.position}).then(data=>{
					this.list=data;
					this.swiperLength=data.length;
				})
			},
			navToDetail(item){
				let url=item.url;
				if(!url){
					return;
				}
				this.navTo(url);
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
			},
			search(){
				uni.navigateTo({
					url:'/pages/article/search'
				})
			}
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.banner-bottom{
		height: 80rpx;
	}
	.city-wrap{
		color: #FFFFFF;
		width: 160rpx;
		flex-wrap: wrap;
	}
	.tui-header {
		width: 100%;
		padding:20rpx;
		box-sizing: border-box;
		background-color: $base-color;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		left: 0;
		 top: 0;
		/* #ifndef H5 || MP  */
		padding-top: var(--status-bar-height);
		/* #endif */
		z-index: 999;
		transition: opacity .4s;
	}
	
	.tui-header-banner {
		padding-top: 80rpx;
		box-sizing: border-box;
		background: $base-color;
		/* #ifndef H5 || MP */
		margin-top: 40rpx;
		/* #endif */
	}
	
	.tui-rolling-search {
		width: 100%;
		height: 60rpx;
		border-radius: 35rpx;
		padding: 0 40rpx 0 30rpx;
		box-sizing: border-box;
		background-color: #F5F5F5;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		color: #999;
	}
	
	.tui-category {
		font-size: 24rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin: 0;
		margin-right: 22rpx;
		flex-shrink: 0;
	}
	
	.tui-category-scale {
		transform: scale(0.7);
		line-height: 24rpx;
	}
	
	.tui-icon-category {
		line-height: 20px !important;
		margin-bottom: 0 !important;
	}
	
	.tui-swiper {
		font-size: 26rpx;
		height: 60rpx;
		flex: 1;
		padding-left: 12rpx;
	}
	
	.tui-swiper-item {
		display: flex;
		align-items: center;
	}
	
	.tui-hot-item {
		line-height: 26rpx;
		height: 26rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	

	
	.tui-hot-search {
		color: #fff;
		font-size: 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;
		box-sizing: border-box;
		position: relative;
		z-index: 2;
	}
	
	.tui-hot-tag {
		background-color: rgba(255, 255, 255, 0.15);
		padding: 10rpx 24rpx;
		border-radius: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 24rpx;
	}
	
	.tui-banner-bg {
		display: flex;
		height: 180rpx;
		background-color: $base-color;
		position: relative;
	}
	
	.tui-primary-bg {
		width: 50%;
		display: inline-block;
		height: 200rpx;
		border: 1px solid transparent;
		position: relative;
		z-index: 1;
		background-color: $base-color;
	}
	
	.tui-route-left {
		transform: skewY(8deg);
	}
	
	.tui-route-right {
		transform: skewY(-8deg);
	}
	
	.tui-banner-box {
		width: 100%;
		padding: 0 20rpx;
		box-sizing: border-box;
		position: absolute;
		/* overflow: hidden; */
		z-index: 99;
		bottom: -80rpx;
		left: 0;
	}
	
	.tui-banner-swiper {
		width: 100%;
		height: 240rpx;
		border-radius: 20rpx;
		overflow: hidden;
		transform: translateY(0);
		background-color: #f8f8f8;
	}
	
	.tui-slide-image {
		width: 100%;
		height: 240rpx;
		display: block;
	}
	
	/* #ifdef MP-WEIXIN */
	.tui-banner-swiper .wx-swiper-dot {
		width: 8rpx;
		height: 8rpx;
		display: inline-flex;
		background: none;
		justify-content: space-between;
	}
	
	.tui-banner-swiper .wx-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background-color: rgba(255, 255, 255, 0.8);
		border-radius: 16rpx;
		overflow: hidden;
	}
	
	.tui-banner-swiper .wx-swiper-dot-active::before {
		background-color: #fff;
	}
	
	.tui-banner-swiper .wx-swiper-dot.wx-swiper-dot-active {
		width: 16rpx;
	}
	
	/* #endif */
	
	.tui-banner-swiper{
		.uni-swiper-dots-horizontal .uni-swiper-dot {
			width: 8rpx;
			height: 8rpx;
			display: inline-flex;
			background-color: none;
			justify-content: space-between;
		}
		
		 .uni-swiper-dot::before {
			content: '';
			flex-grow: 1;
			background-color: rgba(255, 255, 255, 0.8);
			border-radius: 16rpx;
			overflow: hidden;
		}
		
		 .uni-swiper-dot-active::before {
			background-color: #fff;
		}
		
		.uni-swiper-dot.uni-swiper-dot-active {
			width: 16rpx;
		}
	}
	
	
	
</style>
