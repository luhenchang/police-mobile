<template>
	<!-- 广告 -->
	<view class="margin-tb" >
		<u-notice-bar mode="horizontal" :list="list"></u-notice-bar>
	</view>
</template>

<script>
	import {
		mapState,mapMutations
	} from 'vuex';
	export default {
		props:{
			noticeType:{
				type:[String,Number],
				default:2
			}
		},
		
		data() {
			return {
				list:[]
			};
		},
		created() {
				this.loadData();
		},
		methods:{
			loadData(){
				let params={
					pageNum:1,
					pageSize:20,
					noticeType:this.noticeType
				}
				this.Api.getNotice(params).then(data=>{
					let list=[];
					data.forEach(item=>{
						list.push(item.noticeTitle);
					})
					this.list=list;
				})
			},
			
			
		}
	}
</script>

<style lang="scss">
	.ad-wrap{
		margin: 10rpx 20rpx;
		border-radius: 16rpx;
		.ad{
			width: 100%;
		}
		image{
			width: 100%;
			height: 200rpx;
			border-radius: 16rpx;
		}
	}
</style>
