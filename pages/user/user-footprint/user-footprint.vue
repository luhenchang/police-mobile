<template>
	<view class="container">
		<view v-if="!hasLogin" class="container">
			<u-empty text="您还未登录,请先登录" mode="permission">
				<u-button slot="bottom" type="primary" @click="navTo('/pages/auth/login/login')">去登录</u-button>
			</u-empty>
		</view>
		<view v-else>
		
				<view 
					class="list-scroll-content " 				
				>
					<!-- 空白页 -->
					<u-empty v-if="list.length === 0" class="full"></u-empty>
					<view v-else>
						<xui-article-list :list="list" ></xui-article-list>
					</view>
					 
					<u-loadmore class="panel-white" bg-color="#f5f5f5" @loadmore="getList(true)" :status="loadStatus" icon-type="circle" :load-text="loadText" />
					
				</view>
		</view>
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
				list:[],
				pageIndex:1,
				pageSize:5,
				loadStatus:'loading',
				loadText: {
					loadmore: '点击或上拉加载更多',
					loading: '努力加载中',
					nomore: '没有更多了'
				},				
			};
		},
		onShow() {
			
		},
		onPullDownRefresh() {
			this.getList();
		},
		onReachBottom() {
			if(this.loadStatus=='nomore'){
				return;
			}
			this.loadStatus='loading';
			this.getList(true);
		},
		onLoad(options){
			
		},
		onShow() {
			this.getList();
		},
		methods: {
			
			getList(more){
				if(this.loadStatus=='nomore' && more){
					uni.stopPullDownRefresh()
					return;
				}
				if(!more){
					this.pageIndex=1;
				}else{
					this.pageIndex++;
				}
				let params={
					pageIndex:this.pageIndex ||1,
					pageSize:this.pageSize
				}
				this.loadStatus='loading';
				this.Api.getUserFootprintList(params).then(data=>{
					
					if(this.pageIndex==1){
						this.list=data;
					}else{
						this.list=this.list.concat(data);
					}
					if(data.length==0 || data.length<this.pageSize){
						this.loadStatus = 'nomore';
					}else{
						this.loadStatus = 'loadmore';
					}
					this.$forceUpdate()
					uni.stopPullDownRefresh();
				})
			},
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
		height: 100%;
	}
	
	.swiper-box{
		height: 100vh;
		/* #ifdef H5 */
		margin-bottom: 100upx;
		/* #endif */
		
	}
	.list-scroll-content{
		height: 100%;
	}
	.navbar-wrap{
		background: #fff;
		border-top: 1px solid #F5F5F5;
		border-bottom: 1px solid #F5F5F5;
	}
	.navbar{
		display: flex;
		height: 100rpx;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0,0,0,.06);
		position: relative;
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			min-width: 144rpx;
			font-size: 26rpx;
			color: $font-color-dark;
			position: relative;
			.badge{
				position: absolute;
				right: 0px;
				top:3px;
				min-width: 16px;
				min-height: 15px;
				text-align: center;
				background: $uni-color-primary;
				color: #fff;
				font-size: 12px;
				border-radius: 15px;
			}
			&.current{
				color: $base-color;
				font-weight: bold;
				font-size: 28rpx;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}

	.uni-swiper-item{
		height: auto;
	}
	.goods-box{
		height: 160upx;
		padding: 20upx 0;
		white-space: nowrap;
		.goods-item{
			width: 150upx;
			height: 150upx;
			display: inline-block;
			margin-right: 24upx;
		}
		.goods-img{
			display: block;
			width: 100%;
			height: 100%;
		}
	}
	.order-item{
		display: flex;
		flex-direction: column;
	
		background: #fff;
		margin-top: 16rpx;
		.info{
			padding: 16rpx 16rpx;
		}
		.i-top{
			display: flex;
			align-items: center;
			height: 80rpx;
			padding:0 20rpx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;
			border-bottom: 1px solid #F5F5F5;
			.time{
				flex: 1;
			}
			.state{
				color: $base-color;
			}
			.del-btn{
				padding: 10rpx 0 10rpx 36rpx;
				font-size: $font-lg;
				color: $font-color-light;
				position: relative;
				&:after{
					content: '';
					width: 0;
					height: 30rpx;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 20rpx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
		/* 多条商品 */
		.goods-box{
			padding: 0 20rpx;
		}
		/* 单条商品 */
		.goods-box-single{
			display: flex;
			padding: 16rpx 0;
			border-bottom: 1px solid #F5F5F5;
			.goods-img{
				display: block;
				width: 120rpx;
				height: 120rpx;
			}
			.number{
				display: block;
				width: 120rpx;
				height: 120rpx;
			}
		
			
			.right{
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30rpx 0 24rpx;
				overflow: hidden;
				.title{
					font-size: $font-base + 2rpx;
					color: $font-color-dark;
					line-height: 1;
					&:first-child{
						margin-bottom: 16rpx;
					}
					.sub-title{
						display: inline-block;
						margin-right: 16rpx;
					}
				}
				.attr-box{
					font-size: $font-sm + 2rpx;
					color: $font-color-light;
					padding: 10rpx 12rpx;
				}
				.price{
					font-size: $font-base + 2rpx;
					color: $font-color-base;
					&:before{
						content: '￥';
						font-size: $font-sm;
						margin: 0 2rpx 0 8rpx;
					}
				}
			}
		}
		
		.price-box{
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
			padding: 20rpx 30rpx;
			font-size: $font-sm + 2rpx;
			color: $font-color-light;
			.time{
				font-size: $font-sm;
				margin-right: 20rpx;
				color: $font-color-light;
			}
			.num{
				margin: 0 8rpx;
				color: $font-color-dark;
			}
			.price{
				font-size: $font-lg;
				color: $uni-color-primary;
				&:before{
					content: '￥';
					font-size: $font-sm;
					margin: 0 2rpx 0 8rpx;
				}
			}
		}
		.action-box{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 100rpx;
			position: relative;
			padding-right: 30rpx;
		}
		
	}
	
	
	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80rpx;
		align-items: center;
		justify-content: center
	}
	
	.uni-load-more__text {
		font-size: 28rpx;
		color: #999
	}
	
	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}
	
	.uni-load-more__img>view {
		position: absolute
	}
	
	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}
	
	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}
	
	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}
	
	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}
	
	.load2 {
		transform: rotate(30deg)
	}
	
	.load3 {
		transform: rotate(60deg)
	}
	
	.load1 view:nth-child(1) {
		animation-delay: 0s
	}
	
	.load2 view:nth-child(1) {
		animation-delay: .13s
	}
	
	.load3 view:nth-child(1) {
		animation-delay: .26s
	}
	
	.load1 view:nth-child(2) {
		animation-delay: .39s
	}
	
	.load2 view:nth-child(2) {
		animation-delay: .52s
	}
	
	.load3 view:nth-child(2) {
		animation-delay: .65s
	}
	
	.load1 view:nth-child(3) {
		animation-delay: .78s
	}
	
	.load2 view:nth-child(3) {
		animation-delay: .91s
	}
	
	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}
	
	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}
	
	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}
	
	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}
	
	@-webkit-keyframes load {
		0% {
			opacity: 1
		}
	
		100% {
			opacity: .2
		}
	}
</style>
