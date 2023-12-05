<template>
	<view class="media-list">
			<view 
				v-for="(item, index) in list" :key="index"
				class="media-list-item"
				@click="toDetail(item)"
				>
				<view class="left">
				<view class="image-wrapper">
					<image :src="item.thumb" mode="aspectFill"></image>
				</view>
				</view>
				<view class="right">
					<view class="info">
					<view class="title clamp-2">{{item.goodsName}}</view>
					<view class="tit2 clamp-2">{{item.brief || ''}}</view>
					<view class="margin-tb">
						<text class="price">{{item.price}}</text> 
						<text class="market-price" v-if="item.marketPrice">{{item.marketPrice}}</text>
						<text class="sub-txt" v-if="item.number">X {{item.number}}</text>
					</view>
					<view class="sub-txt" v-if="item.interal>0">积分: <text class="price"> {{item.interal}}</text></view>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		props:{
			list:{
				type:Array,
				default:()=>{
					return [];
				}
			},
			level:{
				type:Number,
				default:1
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			toDetail(item){
				uni.navigateTo({
					url:'/pages/mall/goods-detail?goodsId='+item.goodsId
				})
			}
		}
	}
</script>

<style lang="scss">
	.mini{
		.media-list{
			.left{
				width: 180rpx;
				height: 180rpx;
				image{
					width: 180rpx;
					height: 180rpx;
					opacity: 1;
				}
			}
			.right{
				.info{
						min-height:  180rpx;
				}
			
			}
		}
	}
.media-list{
		display:flex;
		flex-wrap:wrap;
		padding:16rpx;
		background: #fff;
		border-radius: 10rpx;
		.title{
			font-size: 30rpx;
			color: $font-color-dark;
			line-height: 1.5;
		}
		
	}
	.media-list-item{
		width: 100%;
		display: flex;
		position: relative;
		padding: 10rpx 0;
		.left{
			width: 220rpx;
			height: 220rpx;
			flex-wrap: nowrap;
			background: #fff;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			image{
				width: 220rpx;
				height: 220rpx;
				opacity: 1;
				border-radius: 10rpx;
			}
		}
		.right{
			width: 100%;
			position: relative;
			
			.info{
				min-height:  220rpx;
				padding-bottom: 16rpx ;
				margin-left: 30rpx;
				border-bottom: 1px solid #F5F5F5;
			}
			.cate-name{
				padding: 8rpx 20rpx;
				background: #FFF0E6;
				border-radius: 24rpx;
				font-size: 18rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #F77C28;
				margin-right: 20rpx;
			}
			.box-wrap{
				display: flex;
				.box{
					width: 100%;
					.line{
						margin-top:0;
						width: 100%;
						.info-text{
							font-size: 20rpx;
							color: $base-color;
						}
					}
					
				}
				.buy-wrap{
					width: 120rpx;
					display: flex;
					flex-direction: column;
					justify-content: flex-end;
					align-items: center;
					.btn{
						width: 50rpx;
						height: 50rpx;
						background: $base-color;
						border-radius: 50%;
						padding: 16rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						image{
							max-width: 25rpx;
							max-height: 25rpx;
						}
					}
					.text{
						font-size: 20rpx;
						color: $base-color;
						text-align: center;
						white-space: nowrap;
					}
					.buy-btn{
						background: $base-color;
						color: #FFFFFF;
						font-size: 20rpx;
						padding: 6rpx 16rpx;
						display: inline-block;
						border-radius: 20rpx;
						white-space: nowrap;
					}
				}
			}
		}
	}
</style>
