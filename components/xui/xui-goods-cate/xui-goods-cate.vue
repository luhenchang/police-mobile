<template>
	<!-- 分类-->
	<view>
		<view class="cate-section" >
			<u-grid :col="5" :border="false" bg-color="#fafafa">
					<u-grid-item v-for="(n,k) in list" :key="k"
					 :custom-style="itemStyle"
					 :bg-color="bgColor"
					 @click="itemClick(n)" >
						<view class="icon-wrap">
							<image class="icon-image" :src="n.categoryImg" mode="aspectFit"></image></view>
						<view class="grid-text">{{n.categoryName}}</view>
					</u-grid-item>
			</u-grid>
		</view>
	</view>
	
</template>

<script>
	
	import {mapMutations,mapState} from 'vuex';
	export default {
		computed:{
			...mapState(['sysConfig'])
		},
		props:{
			type:{
				type:String,
				default:'1'
			},
			pid:{
				type:Number,
				default:0
			},
			bgColor:{
				type:String,
				default:'#FFFFFF'
			},
			
		},
		data() {
			return {
				list:[],
				swiperCurrent:0,
				swiperLength:0,
				itemStyle:{
					'padding':'20rpx 0',
				}
			};
		},
		created() {
				this.getCate();
		},
		methods:{
			getCate(){
				let params={
					parentId:this.pid,
				}
				this.Api.getGoodsCategory(params).then(data=>{
					this.list=data;
					this.swiperLength=this.list.length;
				})
			},
			generateList(data){
				let list=[];
				data.forEach(item=>{
					item.icon_url=this.$helper.getPhoto(item.icon_url);
					item.bgColor=this.getRandomColor();
				},this)
				return data;
			},
			getRandomColor (){
			   // return '#'+Math.floor(Math.random()*16777215).toString(16);
			  var random=function(min,max){
				   // parseInt(Math.random()*(max-min+1)+min,10);
				   return Math.floor(Math.random()*(max-min+1)+min);
			   }
			    let r = random(200,255);
			    let g = random(210,255);
			    let b = random(210,255);
			    let color = 'rgba('+ r +','+ g +','+ b +',0.6)';
				return color;
			},
			itemClick(item){
				uni.navigateTo({
					url:'/pages/mall/cate?categoryId='+item.categoryId
				})
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
		background: #FFFFFF;
		margin-bottom: 16rpx;
	}
	
</style>
