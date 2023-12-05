<template>
	<!-- 分类-->
	<view>
		<view class="cate-section" >
			<u-grid :col="4" :border="false" bg-color="#fafafa">
					<u-grid-item v-for="(n,k) in list" :key="k"
					 :custom-style="itemStyle"
					 :bg-color="bgColor"
					 @click="itemClick(n)" >
						<view class="icon-wrap">
							<image class="icon-image" :src="n.icon" mode="aspectFill"></image></view>
						<view class="grid-text">{{n.name}}</view>
					</u-grid-item>
			</u-grid>
		</view>
	</view>
	
</template>

<script>
	
	import today from '@/static/images/icon/icon-today.svg';
	import recent from '@/static/images/icon/icon-recent.svg';
	import week from '@/static/images/icon/icon-week.svg';
	import month from '@/static/images/icon/icon-month.svg';
	export default {
		props:{
			bgColor:{
				type:String,
				default:'#FFFFFF'
			},
			
		},
		data() {
			return {
				list:[{
					icon:recent,
					name:"最近推送",
					type:0
				},
				{
					icon:today,
					name:"今日通报",
					type:1
				},
				{
					icon:week,
					name:"本周通报",
					type:2
				},
				{
					icon:month,
					name:"本月通报",
					type:3
				}],
				itemStyle:{
					'padding':'20rpx 0',
				}
			};
		},
		created() {
			
		},
		methods:{
			itemClick(n){
				this.$emit("confirm",n.type);
			}
			
		}
	}
</script>

<style lang="scss">
	
	.icon-wrap{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 12rpx;
		image{
			width: 90rpx;
			height: 90rpx;
		}
		.iconfont{
			font-size: 90rpx;
		}
	}
	.grid-text{
		color: #666666;
		font-size: 26rpx;
	}
	
	.cate-section{
		background: #FFFFFF;
		margin-bottom: 16rpx;
	}
	
</style>
