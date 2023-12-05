<template>
	<!-- 分类-->
	<view>
		<view class="cate-section" >
			<u-grid :col="4" :border="false" bg-color="#fafafa">
					<u-grid-item v-for="(n,k) in list" :key="k"
					 :custom-style="itemStyle"
					 @click="itemClick(n)" >
						<view class="icon-wrap">
							<image class="icon-image" :src="n.icon" mode="aspectFit"></image></view>
						<view class="grid-text">{{n.name}}</view>
					</u-grid-item>
			</u-grid>
		</view>
	</view>
	
</template>

<script>
	
	import {mapMutations,mapState} from 'vuex';
	export default {
		props:{
			position:{
				type:String,
				default:'index'
			},
		},
		data() {
			return {
				list:[{
					icon:'',
					name:'商品盲盒',
					isTab:false,
					url:'/pages/mall/box'
				},
				{
					icon:'',
					name:'同城商家盲盒',
					isTab:false,
					url:'/pages/merchant/box'
				},
				],
				swiperCurrent:0,
				swiperLength:0,
				itemStyle:{
					'padding':'20rpx 0',
					'white-space':'nowrap',
					'overflow':'hidden'
				}
			};
		},
		created() {
			this.getList();
		},
		methods:{
			getList(){
			 this.Api.getAppFunction({position:this.position}).then(data=>{
				 this.list=data;
			 })	
			},
			itemClick(item){
				if(item.isTab==1){
					uni.switchTab({
						url:item.url
					})
				}else{
					this.navTo(item.url)
				}
				
			},
			
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
	}
	.grid-text{
		color: #666666;
		font-size: 26rpx;
	}
	
	.cate-section{
		margin-top:20rpx;
	}
	
</style>
