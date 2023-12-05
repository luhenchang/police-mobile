<template>
	<view class="tui-product-list">
		<view class="tui-product-container">
			<block v-for="(item, index) in list" :key="index" v-if="(index + 1) % 2 != 0">
				<!--商品列表-->
				<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" @click="detail(item)">
					<image :src="item.thumb " class="tui-pro-img" mode="widthFix" />
					<view class="tui-pro-content">
						<view class="tui-pro-tit">{{ item.goodsName }}</view>
						<view>
							<view class="tui-pro-price">
								<text class="sale-score" v-if="item.integral >0"><image :src="statics.iconJifen" class="icon-mini"></image>{{ item.integral }} +</text>
								<text class="tui-sale-price small">￥{{ item.price }} </text>
								
							</view>
							<view class="tui-pro-pay"><text>{{ item.saleCount || 0 }}人付款</text>
							<text class="tui-factory-price">￥{{ item.marketPrice }}</text>
							</view>
						</view>
					</view>
				</view>
				
			</block>
		</view>
		<view class="tui-product-container">
			<block v-for="(item, index) in list" :key="index" v-if="(index + 1) % 2 == 0">
				<!--商品列表-->
				<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" @click="detail(item)">
					<image :src="item.thumb " class="tui-pro-img" mode="widthFix" />
					<view class="tui-pro-content">
						<view class="tui-pro-tit">{{ item.goodsName }}</view>
						<view>
							<view class="tui-pro-price">
								<text class="tui-sale-price">￥{{ item.price }} </text>
								<text class="tui-factory-price">￥{{ item.marketPrice }}</text>
							</view>
							<view class="tui-pro-pay">{{ item.saleCount ||0 }}人付款</view>
						</view>
					</view>
				</view>
				<!--商品列表-->
			</block>
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
			detail(item){
				uni.navigateTo({
					url:'/pages/mall/goods-detail?goodsId='+item.goodsId
				})
			}
		}
	}
</script>

<style lang="scss">

	.tui-product-list {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		box-sizing: border-box;
		/* padding-top: 20rpx; */
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
		color: red;
		&.small{
			font-size: 28rpx;
		}
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
</style>
