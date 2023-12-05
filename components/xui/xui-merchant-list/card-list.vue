<template>
	<view>
	<view v-for="(item,index) in list" :key="index">
	<navigator :url="'/pages/tuan/detail?id='+item.id" >
	<view class="box pd12_10 flex alcenter mb7">
		<image class="tuan-product-l" :src="item.pic_url" mode="aspectFill"></image>
		<view class="tuan-product-r pl10">
			<view class="ft14 ftw600 cl-main text-over2">{{item.name}}</view>
			<view class="sub-txt clamp-2">{{item.brief}}</view>
			<view v-if="item.type==2">
				<view class="">
					<text class="ft12 cl-orange">会员价</text>
					<text class="ft12 cl-orange">¥</text>
					<text class="ft16 cl-orange ftw600">{{item.price}}</text>
					<text class="ml15 ft12 cl-notice text-line">¥{{item.retail_price}}</text>
				</view>
				<view class="mt8 flex space alcenter">
					<view class="ft12 cl-notice">已售{{item.count_sale}}</view>
					<view class="btn-mini" :style="getBtnStyle">购买</view>
				</view>
			</view>
			<view v-if="item.type==1">
				<view class="flex alcenter space mt2 cl-notice">
					<view class="flex alcenter">
						<text class="ft12">门市价：</text>
						<text class="ft12 text-line">¥{{item.retail_price}}</text>
					</view>
					<view class="flex alcenter">
						<text class="ft12">已兑</text>
						<text class="ft12">{{item.count_sale}}</text>
					</view>
				</view>
				<view class="mt2 flex alend space">
					<view class="flex alcenter">
						<image :src="statics.integralImg01" style="width: 32rpx; height: 32rpx;"></image>
						<text class="ft16 cl-orange ftw600">{{item.score}}</text>
					</view>
					
				</view>
				<view class="flex alend space">
					<view class="ft16 cl-orange ftw600"> + ¥{{item.price}}</view>
					<button  :data-id="1" class="btn-mini" :style="getBtnStyle">兑换</button>
				</view>
			</view>
		</view>
	</view>
	</navigator>
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
		created() {
			console.log(this.list)
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
	.user-not-vip{
		width: 100%;
		height: 80rpx;
		background: #FDF6EC;
		border-radius: 40rpx;
		border: 2rpx solid #EFC381;
		text-align: center;
		line-height: 76rpx;
		font-size: 24rpx;
		color:#000000;
		font-weight: bold;
	}
	

	.tuan-product-l{
		width: 280rpx;
		height: 240rpx;
		border-radius: 16rpx;
		background: #F2F2F2;
	}
	.tuan-product-r{
		width: calc(100% - 280rpx);
	}
	.mini{
		.tuan-product-l{
			width: 220rpx;
			height: 180rpx;
		}
		.tuan-product-r{
			width: calc(100% - 220rpx);
		}
	}
</style>
