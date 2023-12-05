<template>
	<view>
		<view  v-show="loading">
			 <view class="u-skeleton">
				<view style="margin: 20px 0">
					<view v-for="(item,index) in lists" :key="index" class="lists">
						<!--u-skeleton-rect 绘制矩形-->
						<view class="u-skeleton-rect">{{item}}</view>
					</view>
				</view>
				<view style="margin: 20px 0">
					<view v-for="(item,index) in lists" :key="index" class="lists">
						<!--u-skeleton-rect 绘制矩形-->
						<view class="u-skeleton-rect">{{item}}</view>
					</view>
				</view>
				<view style="margin: 20px 0">
					<view v-for="(item,index) in lists" :key="index" class="lists">
						<!--u-skeleton-rect 绘制矩形-->
						<view class="u-skeleton-rect">{{item}}</view>
					</view>
				</view>
				<skeleton :loading="loading" :animation="true" bgColor="#FFF"></skeleton>
			</view>
		</view>
		<view v-show="!loading">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	import {
		mapState,mapMutations
	} from 'vuex';
	import Skeleton from './skeleton.vue'
	export default {
		components:{
			Skeleton
		},
		props:{
			type:{
				type:String,
				default:'view'
			},
			loading:{
				type:Boolean,
				default:true
			},
			
		},
		computed:{
		
		},
		data() {
			return {
				lists: [
					'君不见，黄河之水天上来，奔流到海不复回。君不见，高堂明镜悲白发，朝如青丝暮成雪。',
					'人生得意须尽欢，莫使金樽空对月',
					'天生我材必有用，千金散尽还复来',
				 ],
				}
			
		},
		created() {
		},
		methods:{
			
			}
		
	}
</script>

<style lang="scss" scoped>

   .userinfo {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.userinfo-avatar {
		width: 128rpx;
		height: 128rpx;
		margin: 20rpx;
		border-radius: 50%;
	}

	.lists {
		margin: 10px 0;
	}
</style>
