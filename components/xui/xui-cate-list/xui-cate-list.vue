<template>
	<!-- 分类-->
	<view class="cate-wrap">
	 <block  v-for="(item,index) in list" :key="index">
		   <view  :class="{'c-title':item.children.length>0,'c-sub-tittle':item.children.length<=0}" @click="toList(item)" v-if="!!item.name">{{item.name}}</view>
		   <view class="c-wrap" v-if="item.children.length>0">
			   <text class="c-sub-tittle" v-for="(n,j) in item.children" :key="j" v-if="!!n.name"  @click="toList(n)">{{n.name}}</text>
		   </view>
			
	 </block>
	 </view>
	
</template>

<script>
	
	import {mapMutations,mapState} from 'vuex';
	export default {
		computed:{
			...mapState(['sysConfig'])
		},
		props:{
			list:{
				type:Array,
				default:()=>{
					return [];
				}
			},
		},
		data() {
			return {
				
			};
		},
		created() {
		},
		methods:{
			toList(item){
				uni.navigateTo({
					url:'/pages/article/list?cid='+item.id+'&cname='+item.name
				})
			}
			
		}
	}
</script>

<style lang="scss">
	.cate-wrap{
		padding: 20rpx;
		border-bottom: 1px solid #F5F5F5;
		background: #FFFFFF;
	}
	.c-wrap{
		padding: 16rpx;
	}
	.c-title{
		color: #000;
		margin:0 10rpx 10rpx 0;
		padding: 10rpx 20rpx;
		border-bottom: 1px solid $light-bg-color;
		font-size: 30rpx;
		border-radius: 10rpx;
	}
	.c-sub-tittle{
		display: inline-block;
		margin:0 10rpx 10rpx 0;
		color: #007aff;
		padding: 10rpx 20rpx;
		background: $light-bg-color;
		font-size: 26rpx;
		border-radius: 10rpx;
	}
	
</style>
