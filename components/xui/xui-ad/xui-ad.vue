<template>
	<!-- 广告 -->
	<view class="ad-wrap" v-if="!!ad.img" >
		<view class="ad">
			<image :src="ad.img" mode="aspectFill" @click="navTo(ad.link)" />
		</view>
	</view>
</template>

<script>
	import {
		mapState,mapMutations
	} from 'vuex';
	export default {
		props:{
			position:{
				type:String,
				default:'mobile_index'
			}
		},
		computed:{
			...mapState(['userInfo','city'])
		},
		data() {
			return {
				ad:{},
				swiperCurrent:0,
				swiperLength:0
			};
		},
		created() {
				this.loadData();
		},
		methods:{
			loadData(){
				this.Api.getAd({position:this.position}).then(data=>{
					if(!!data.value){
						let ad=JSON.parse(data.value);
						ad.img=this.$helper.getPhoto(ad.ad)
						this.ad=ad;
					}
					
				})
			},
			navToDetail(item){
				let title="详情";
				let url=item.link;
				uni.navigateTo({
					url:encodeURIComponent(url)
				})
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
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
