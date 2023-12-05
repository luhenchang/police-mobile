<template>
	<view class="tui-product-list">
		<view class="tui-product-container">
			<block v-for="(item, index) in list" :key="index" v-if="(index + 1) % 2 != 0">
				<!--商品列表-->
				<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" @click="detail(item)">
					<image :src="item.thumb " class="tui-pro-img" mode="aspectFit" />
					<view class="tui-pro-content">
						<view class="tui-pro-tit">{{ item.boxName }}</view>
						<view class="sub-txt clamp-2">{{item.brief}}</view>
						<view>
							<view class="tui-pro-price">
								<u-tag text="会员价" size="mini"></u-tag><text class="price">{{ item.memberPrice }} </text>
								<text class="market-price">{{ item.price }}</text>
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
					<image :src="item.thumb " class="tui-pro-img" mode="aspectFit" />
					<view class="tui-pro-content">
						<view class="tui-pro-tit">{{ item.boxName }}</view>
						<view class="sub-txt clamp-2">{{item.brief}}</view>
						<view>
							<view class="tui-pro-price">
								<u-tag text="会员价" size="mini"></u-tag><text class="price">{{ item.memberPrice }} </text>
								<text class="market-price">{{ item.price }}</text>
							</view>
						</view>
					</view>
				</view>
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
					url:'/pages/mall/goods-detail?id='+item.id
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
		margin:16rpx;
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
		border-radius: 16rpx;
		overflow: hidden;
	}

	.tui-pro-img {
		height: 320rpx;
		width: 100%;
		display: block;
	}

	.tui-pro-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 14rpx;
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
		padding-top: 12rpx;
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
</style>
