<template>
	<view class="product-box">
	<view class="tui-block__box ">
		<view class="tui-group-name">
			<view>
				<text>{{title}}</text>
				<text class="tui-sub__desc tui-color__pink">{{subTitle}}</text>
			</view>
			<view class="tui-more__box" @click="toList">
				<text>更多</text>
				<tui-icon name="arrowright" :size="36" unit="rpx" color="#999"></tui-icon>
			</view>
		</view>
		<scroll-view scroll-x>
			<view class="tui-goods__list">
				<view class="tui-goods__item" @click="toDetail(item)" v-for="(item, index) in list" :key="index">
					<view class="tui-goods__imgbox">
						<image :src="item.thumb" mode="aspectFit" class="tui-goods__img"></image>
					</view>
					<view class="tit clamp">{{item.goodsName}}</view>
					<!-- <view class="sub-txt">{{item.brief}}</view> -->
					<view class="sub-txt price-box">
						<text class="price">{{item.memberPrice}}</text>
						<text class="market-price">{{item.marketPrice}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
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
				default:'会员免费领'
			},
			subTitle:{
				type:String,
				default:'会员每天领取免费商品'
			},
			isFree:{
				type:String,
				default:'0'
			},
			isDiscount:{
				type:String,
				default:'0'
			},
		},
		data() {
			return {
				list:[],
			};
		},
		created() {
				this.loadData();
		},
		methods:{
			loadData(){
				this.Api.getGoodsList({isFree:this.isFree,isDiscount:this.isDiscount}).then(data=>{
					this.list=data.rows;
				})
			},
			toDetail(item){
				uni.navigateTo({
					url:'/pages/mall/goods-detail?goodsId='+item.goodsId
				})
			},
			toList(){
				uni.navigateTo({
					url:'/pages/mall/cate?isFree='+this.isFree+'&isDiscount='+this.isDiscount
				})
			}
		
			
		}
	}
</script>

<style lang="scss">
.product-box {
	margin-top: 20rpx;
	padding: 0 20rpx;
	box-sizing: border-box;
}	
.price{
	font-size: 26rpx;
}
.market-price{
	font-size: 24rpx;
}
.price-box{
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}
.tui-block__box {
		width: 100%;
		padding: 0 25rpx 25rpx;
		box-sizing: border-box;
		background-color: #ffffff;
		border-radius: 20rpx;
		overflow: hidden;
}
.tui-goods__list {
		display: flex;
		align-items: flex-start;
	}
.tui-group-name {
		width: 100%;
		font-size: 34rpx;
		line-height: 34rpx;
		font-weight: bold;
		text-align: center;
		padding: 30rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #333;
	}
	.tui-goods__item {
		background-color: #fff;
		width: 220rpx;
		// height: 230rpx;
		border-radius: 6rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		flex-shrink: 0;
		margin-right: 18rpx;
		.tit{
			font-size: 28rpx;
			margin-bottom: 12rpx;
		}
	}
	
	.tui-goods__imgbox {
		width: 200rpx;
		height: 200rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}
	
	.tui-goods__img {
		max-width: 200rpx;
		max-height: 200rpx;
		display: block;
	}
	
	.tui-pri__box {
		max-width: 200rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.tui-sale-pri {
		display: flex;
		align-items: flex-end;
		padding: 10rpx 0 8rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		line-height: 28rpx;
		color: #eb0909;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	
	.tui-size-sm {
		font-size: 24rpx;
		line-height: 24rpx;
		transform: scale(0.8);
		transform-origin: 0 50%;
	}
	
	.tui-original__pri {
		font-size: 24rpx;
		line-height: 24rpx;
		color: #999999;
		transform-origin: center 10%;
		transform: scale(0.8);
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: line-through;
	}
	.tui-sub__desc {
		color: #34c7a9;
		font-size: 28rpx;
		font-weight: 400;
		padding-left: 25rpx;
	}
	
	.tui-color__pink {
		color: $base-color;
	}
	
	.tui-seckill__box {
		display: flex;
		align-items: center;
	}
	.tui-more__box {
		display: flex;
		align-items: center;
		font-weight: 400;
		color: #999;
	}
	
	.tui-more__box text {
		font-size: 24rpx;
		line-height: 24rpx;
	}
	
</style>
