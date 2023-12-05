<template>
	<view>
		<view class="title-box" v-if="showTitle">
			<view class="flex alcenter space">
				<view class="flex alcenter">
					<image style="width: 50rpx;height: 50rpx;" v-if="!!icon" :src="icon"></image>
					<text class="ft20 ftw600 cl-main ml10">{{title}}</text>
				</view>
				<navigator url="/pages/merchant/index">
				<view class="ft14 cl-notice">更多</view>
				</navigator>
			</view>
		</view>
	 <xui-merchant-list :list="list" v-if="showType=='media'"></xui-merchant-list>
	</view>
</template>

<script>
	export default {
		props:{
			showType:{
				type:String,
				default:'media'
			},
			showTitle:{
				type:Boolean,
				default:true
			},
			icon:{
				type:String,
				default:''
			},
			title:{
				type:String,
				default:'附近商家'
			},
			merchantId:{
				type:Number,
				default:null
			},
			categoryId:{
				type:Number,
				default:null
			},
			isSelected:{
				type:Number,
				default:0
			},
			isHot:{
				type:Number,
				default:0
			},
		
		},
		data() {
			return {
				list:[],
				queryParams:{}
			};
		},
		watch:{
			'curPosition.lng':function(nval){
				this.loadData();
			}
		},
		created() {
			
			this.loadData();
		},
		methods:{
			loadData(){
				console.log(this.curPosition);
				this.queryParams={
					pageNum:1,
					pageSize:10,
					city:this.currentCity,
					categoryId:this.categoryId,
					isSelected:this.isSelected,
					isHot:this.isHot,
					lng:this.curPosition.lng,
					lat:this.curPosition.lat
				}
				this.Api.getMerchantListByDistance(this.queryParams).then(data=>{
					
					let list=data.rows;
					list.forEach(item=>{
						if(item.distance){
						  item.distance=(parseFloat(item.distance)).toFixed(2)+' km';
						}
					})
					this.list=list;
				})
			},
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
