<template>
	<view>
	 <media-item :item="item" v-if="showType=='media'" />
	 <pic-item :item="item" v-if="showType=='pic'" />
	</view>
</template>

<script>
	import mediaItem from './media-item'
	import picItem from './pic-item'
	export default {
		components:{
			mediaItem,picItem
		},
		props:{
			item:{
				type:Object,
				default:()=>{
					return {};
				}
			},
			showType:{
				type:String,
				default:'media'
			}
		
		},
		data() {
			return {
				
			};
		},
		created() {
			
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	.title-box{
		padding: 20rpx;
		box-sizing: border-box;
	}
.d-header-wrap{
	margin-top: 16rpx;
}
.d-header{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80rpx;
			font-size: $font-base + 2rpx;
			color: $font-color-dark;
			position: relative;
				
			text{
				padding: 0 20rpx;
				background: #FAFAFA;
				position: relative;
				z-index: 1;
			}
			.tit2{
				font-size: $font-sm;
				color: $font-color-light;
			}
			&:after{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300rpx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc; 
			}
}
</style>
